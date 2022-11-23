import React, { useContext, useState, useRef, useEffect } from 'react';
import Dashboard from '../../components/layout/Dashboard';
import Container from '../../components/utility/Container';
import { sideBarMenu, sideFooter } from '../../data/index';
import Link from 'next/link';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import { IBlog } from 'utility/interfaces';
import { useRouter } from 'next/router';
import styles from 'styles/Posts.module.css';
import { FaEdit, FaEye, FaReadme, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Avatar from 'react-avatar';
import Modal from '@utility/Modal';
import { AlertMsg } from '@utility/Alert';
import Axios from 'api/axios';

const prisma = new PrismaClient();
const Posts: NextPage = ({ datas }: any) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [postId, setPostId] = useState('');
  const modalText = 'Are you sure you want to delete this post?';

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    // let _id = window.location.pathname.split('/')[2];
    setPosts(datas as IBlog[]);
    // console.log(datas);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [datas]);

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
          router.push('/post');
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

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'bg-[#eee] p-5 min-h-screen'}>
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
            <Link href="/post/create" className="ml-auto btn">
              Add new post
            </Link>
          </div>
          <div className="card w-full bg-none bg-transparent">
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
                          name={post.user.username || post.user.name}
                          size="25"
                          round
                          className="mr-2"
                        />
                        <b className="text-gray-700">{post.user.username}</b> on{' '}
                        {`${new Date(post.createdAt).toLocaleString()}`}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/post/${post.id}`}
                          className="text-blue-500 hover:text-gray-600"
                        >
                          <FaEye />
                        </Link>
                        {session?.user?.name ===
                          (post?.user?.username || post.user.name) && (
                          <>
                            <Link
                              href={`/post/${post.id}/edit`}
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
    </Dashboard>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const datas = await prisma.post.findMany({
    include: { user: true },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      datas: JSON.parse(JSON.stringify(datas)),
    },
  };
};

export default Posts;
