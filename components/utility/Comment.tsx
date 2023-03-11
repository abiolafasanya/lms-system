import React, {SetStateAction, useState, useEffect} from 'react';
import Axios from 'helper/axios';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { FaEdit, FaEye, FaRegThumbsUp, FaTrash } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { IComment } from 'utility/interfaces';
import Avatar from 'react-avatar';
import Modal from '@utility/Modal';
import { formatDate } from 'utility/formatter';
import Link from 'next/link';
import styles from 'styles/Posts.module.css';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  );

  interface Iprops {
    // isComment: boolean;
    // setIsComment: SetStateAction<boolean>;
    postId: string;
    setSuccess: any;
    setError: any;
    setMessage: any;
    comments: IComment[];
  }

 const Comments: React.FC<Iprops> = ({postId, setError, setMessage, setSuccess, comments}) => {

    const [commentEditorState, setCommentEditorState] = useState<EditorState>(
      EditorState.createEmpty()
    );
    const [content, setContent] = useState<string>('');
    const [commentId, setCommentId] = useState<string>('');
    const [isComment, setIsComment] = useState(false);
    const [showComment, setshowComment] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [likes, setLikes] = useState(0);

    const { data: session, status: authSession } = useSession();

    function cleanup() {
      setTimeout(() => {
        setError(false)
        setMessage('')
        setSuccess(false)
        setContent('')
        setCommentEditorState(() => EditorState.createEmpty())
      }, 3000)
    }

    async function commentHandler(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setContent(
        draftToHtml(convertToRaw(commentEditorState.getCurrentContent()))
        );
      const body = {
        comment: content,
        userId: session?.user?.id
      }
       console.log(body)
       let Endpoint = `/api/post/${postId}/comment`
        if (authSession !== 'authenticated') throw new Error('not authenticated');
        const { data, status } = await Axios.post(Endpoint, body);
        if (data.error) {
          console.log(data.error)
          setError(() => true)
          setMessage(() => data.error)
          cleanup()
          return
        }
        if(status === 200) {
          console.log(data)
          setMessage(data.message)
          setSuccess(true)
          cleanup()
          return
        }
      } 

      function closeModal() {
        setIsDel(false);
      }
    
      async function confirmDelete() {
        console.log('confirming', commentId);
        const COMMENT_URL = `/api/post/comment/${commentId}/delete`;
        try {
          const { data, status } = await Axios.delete(COMMENT_URL);
          if (status === 200) {
            setSuccess(true);
            setError(false);
            setIsDel(false);
            setMessage('Your comment has been deleted successfully');
            cleanup()
          }
        } catch (error) {
          setIsDel(false);
          setError(true);
          setSuccess(false);
          setMessage('An error occured try again');
          cleanup()
        }
      }
    
      function removeComment(id: any) {
        console.log(id);
        setIsDel(true);
        setCommentId(id);
      }

    
    return (
        <div>
          {isDel && (
          <Modal action={confirmDelete} title="Delete Post" close={closeModal}>
            You are about to remove this comment press confirm to continue
          </Modal>
        )}
          <div className="mx-7 m-2 flex space-x-3 sm:flex-wrap md:flex-nowrap items-center text-blue-500">
            <button className="flex space-x-3"
            onClick={() => setLikes(likes => likes === 0 ? 1 : 0)}
            >
            <span>{likes}</span>
            <FaRegThumbsUp className="text-blue-500" />
            </button>
            <span>Likes</span>
            <button className='flex space-x-3 items-center' 
            onClick={() => setIsComment(bool => !bool)}>
            <BsChatDots className="text-blue-500" />
            <span>Comment</span>
            </button>
            <button onClick={() => setshowComment(bool => !bool)}>
             { showComment ? ('hide comments'): ('show comments') }
           </button>
          </div>
          <section>  
          {isComment && (
                <div className="card">
                <form onSubmit={commentHandler}>
                  <div className="form-group mb-0">
                    <Editor
                      editorState={commentEditorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="bg-white dark:bg-gray-700 dark:text-gray-200 border"
                      editorClassName="editorClassName p-3"
                      placeholder="Write your comment here"
                      onEditorStateChange={(newState) => {
                        setCommentEditorState(newState);
                        setContent(
                          draftToHtml(convertToRaw(newState.getCurrentContent()))
                        );
                      }}
                    />
                  </div>
                  <div className="mx-2 flex space-x-3">
                    <button type='button' className="ml-auto btn bg-transparent border text-red-500 hover:text-red-50 hover:bg-red-500 border-red-500 rounded-sm px-7"
                    onClick={() => setIsComment(bool => !bool)}
                    >Cancel</button>
                    <button className="ml-auto btn rounded-sm px-7">Comment</button>
                  </div>
                </form>
              </div>
             )}
          </section>
          <section className=''>
             {
             showComment &&  comments?.length > 0 && 
              comments?.map((comment, index) => (
                <div key={index} className='card mx-7 bg-gray-50 p-5 my-2 rounded-sm dark:bg-gray-700'>
                  <div className="card-footer mt-2">
                    <div className="flex justify-between">
                      <div className="block italic text-sm">
                        <Avatar
                          name={comment?.user?.username || comment?.user?.name}
                          size="25"
                          round
                          className="mr-2"
                        />
                        <b className="text-gray-700 dark:text-gray-400">{comment?.user?.username}</b> on{' '}
                        {formatDate(new Date(comment.createdAt))}
                      </div>
                      <div className="flex items-center space-x-2">
                        {session?.user?.name ===
                          ( comment?.user?.username || comment?.user?.name) && (
                          <>
                            <Link
                              href={`/admin/post/comment/${comment.id}/edit`}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => removeComment(comment.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.text + ' mx-7'}
                    dangerouslySetInnerHTML={{ __html: comment.content as string }}
                /> 
                </div>
              ))
             }
          </section>
        </div>
    );
  }
  
  export default Comments;