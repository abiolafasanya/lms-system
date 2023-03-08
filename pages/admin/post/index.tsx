import React, { useState, useEffect, SetStateAction } from 'react';
import Admin from '@layout/Admin';
import Container from '@utility/Container';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from 'styles/Posts.module.css';
import { FaEdit, FaEye, FaRegThumbsUp, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Avatar from 'react-avatar';
import Modal from '@utility/Modal';
import Comments from '@utility/Comment';
import { AlertMsg } from '@utility/Alert';
import Axios from 'helper/axios';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { formatDate } from 'utility/formatter';
import { BsChatDots } from 'react-icons/bs';
import { Post, Comment, User, PrismaClient } from '@prisma/client';
import { IBlog } from 'utility/interfaces';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface IPost extends Post {
  user: User;
  comments: IComment[]
}

interface IComment extends Comment {
  user: User;
}

interface Iprops {
  serverPost: IPost
}

const Posts: NextPage<Iprops> = ({ serverPost }) => {
  const router = useRouter();
  const { data: session, status: authSession } = useSession();

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const [posts, setPosts] = useState<IBlog[]>([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [likes, setLikes] = useState(0);
  const [postId, setPostId] = useState('');
  const [content, setContent] = useState<string>('');
  

  const modalText = 'Are you sure you want to delete this post?';

  useEffect(() => {
    let isMounted = true;
    const APIPost = async () => {
      const {data} = await Axios.post('/api/post/');
      if(data.error) return
      setPosts(data.post)
      // console.log('api post', data)
      // console.log('posts', posts)
      return
    }
    APIPost().then(data => data);

    return () => {
      isMounted = false;
    };
  }, [success, openModal]);

  function closeModal() {
    setOpenModal(false);
  }


  function cleanup() {
    setTimeout(() => {
      setError(false)
      setMessage('')
      setSuccess(false)
      setContent('')
      setEditorState(() => EditorState.createEmpty())
    }, 3000)
  }

  async function confirmDelete() {
    console.log('confirming', postId);
    const POST_URL = `/api/post/${postId}/delete`;
    try {
      const { data, status } = await Axios.delete(POST_URL);
      if (status === 200) {
        setSuccess(true);
        setError(false);
        setOpenModal(false);
        setMessage('Your post has been deleted successfully');
        cleanup()
      }
    } catch (error) {
      setOpenModal(false);
      setError(true);
      setSuccess(false);
      setMessage("Internal Error!, Try later");
      cleanup()
    }
  }

  function removePost(id: any) {
    console.log(id);
    setOpenModal(true);
    setPostId(id);
  }

 async function postHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setContent(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    const body = {
      content,
      email: session?.user?.email
    }
    console.log(body)
      if (authSession !== 'authenticated') throw new Error('not authenticated');
      const { data, status } = await Axios.post('/api/post/create', body);
      if (data.error) {
        console.log(error)
        return
      }
      if(status === 200) {
        console.log(data)
        setContent('')
        setShowPost(show => !show)
        setSuccess(() => true)
        setMessage(data.message)
        setTimeout(() => {
          setSuccess(cond => !cond)
          setMessage('')
        }, 3000)
        return
      }
    } 

  return (
    <Admin>
      <Container
        className={'sm:px-2 md:px-0 md:max-w-6xl mx-auto min-h-screen'}
      >
        {openModal && (
          <Modal action={confirmDelete} title="Delete Post" close={closeModal}>
            {modalText}
          </Modal>
        )}
        <section className="p-5 w-full mx-5">
          {success && (
            <AlertMsg message={message} type="alert-success py-2 mb-4" />
          )}
          {error && <AlertMsg message={message} type="alert-error py-2 mb-4" />}
          <div className="flex w-full">
            <button
              onClick={() => setShowPost((show) => !show)}
              className="ml-auto btn"
            >
              Add new post
            </button>
          </div>
          <div className="w-full">
          {showPost && (
              <form onSubmit={postHandler}>
                <div className="form-group mb-0">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="bg-white dark:bg-gray-700 dark:text-gray-200 border"
                    editorClassName="editorClassName p-3"
                    placeholder="Write your post here"
                    onEditorStateChange={(newState) => {
                      setEditorState(newState)
                      setContent(
                        draftToHtml(convertToRaw(newState.getCurrentContent()))
                      )
                    }}
                  />
                </div>
                <div className="mx-2 flex ">
                  <button className="ml-auto btn rounded-sm px-7">Make a post</button>
                </div>
              </form>
            )}
          </div>
          <div className="w-full">
            {posts &&
              posts.map((post) => (
                <div
                  className="card w-full p-3 shadow-md border rounded-md"
                  key={post.id}
                >
                  <h1 className="card-header text-2xl mb-2">{post?.title}</h1>
                  <div className="card-body">
                  </div>
                  <div className="card-footer mt-2">
                    <div className="flex justify-between">
                      <div className="block italic text-sm">
                        <Avatar
                          name={post?.user?.username || post?.user?.name}
                          size="25"
                          round
                          className="mr-2"
                        />
                        <b className="text-gray-700">{post?.user?.username}</b> on{' '}
                        {formatDate(new Date(post.createdAt))}
                      </div>
                      <div className="flex items-center space-x-2">
                        
                        <Link
                          href={`/admin/post/${post.id}`}
                          className="text-blue-500 hover:text-gray-600"
                        >
                          <FaEye />
                        </Link>
                        {session?.user?.name ===
                          ( post?.user?.username || post?.user?.name) && (
                          <>
                            <Link
                              href={`/admin/post/${post.id}/edit`}
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => removePost(post.id)}
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
                    dangerouslySetInnerHTML={{ __html: post.content }}
                /> 
                {/* <div className="mx-7 m-2 flex space-x-3 items-center text-blue-500">
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
                </div> */}
                 <Comments 
                    postId={post.id} 
                    setSuccess={setSuccess as SetStateAction<boolean>} 
                    setError={setError as SetStateAction<boolean>} 
                    setMessage={setMessage as SetStateAction<string>} 
                    comments={post?.Comment}
                  />
                </div>
              ))}
          </div>
        </section>
      </Container>
    </Admin>
  );
};


const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await prisma.post.findMany({
    include: { user: true, Comment: {include: {user: true}} },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      serverPost: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default Posts;
