import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { sideBarMenu, sideFooter } from 'data/index';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { Post, PrismaClient } from '@prisma/client';
import { IBlog } from 'utility/interfaces';
import { useRouter } from 'next/router';
import styles from 'styles/Posts.module.css';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Avatar from 'react-avatar';
import Modal from '@utility/Modal';
import { AlertMsg } from '@utility/Alert';
import Axios from 'helper/axios';
import dynamic from 'next/dynamic';
import { EditorProps } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { formatDate } from 'utility/formatter';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const Posts: NextPage<{serverPost: any}> = ({ serverPost }) => {
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
  const [postId, setPostId] = useState('');
  const [content, setContent] = useState<string>('');

  const modalText = 'Are you sure you want to delete this post?';

  useEffect(() => {
    let isMounted = true;
    // let _id = window.location.pathname.split('/')[2];
    const APIPost = async () => {
      const {data} = await Axios.post('/api/post/');
      if(data.error) return
      // console.log('api post', data)
      setPosts(data.post)
      return
    }
    APIPost().then(data => data);

    return () => {
      isMounted = false;
    };
  }, [success, error, openModal]);

  function closeModal() {
    setOpenModal(false);
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
        setTimeout(() => {
          setSuccess(false);
          setMessage('');
          router.push('/admin/post');
        }, 3000);
      }
    } catch (error) {
      setOpenModal(false);
      setError(true);
      setSuccess(false);
      setMessage(error as string);
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
    <Tutor>
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
                    <div
                      className={styles.text}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
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
                          (post?.user?.username || post?.user?.name) && (
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
                </div>
              ))}
          </div>
        </section>
      </Container>
    </Tutor>
  );
};

const prisma = new PrismaClient();
export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await prisma.post.findMany({
    include: { user: true },
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
