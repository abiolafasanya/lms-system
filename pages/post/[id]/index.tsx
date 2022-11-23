import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Dashboard from '@layout/Dashboard';
import { sideBarMenu, sideFooter } from '../../../data/index';
import Container from '../../../components/utility/Container';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Axios from 'api/axios';
import { AlertMsg as Alert } from '@utility/Alert';
import Modal from '@utility/Modal';
import Avatar from 'react-avatar';

const prisma = new PrismaClient();

const post: NextPage = ({ post }: any) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const modalText =
    'Are you about to delete a post select confirm to proceed an cancel to return';

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    console.log ('Mounted')
    return () => {
      isMounted = false;
      controller.abort();
    };
  } , [post])

  function closeModal() {
    setOpenModal(false);
  }

  async function removePost() {
    const POST_URL = `/api/post/${post.id}/delete`;
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

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'bg-[#eee] p-5 min-h-screen'}>
        {success && <Alert message={message} type="alert-success" />}
        {error && <Alert message={message} type="alert-error" />}
        {openModal && (
          <Modal action={removePost} title="Delete Post" close={closeModal}>
            {modalText}
          </Modal>
        )}
        <div className="card w-full bg-none bg-transparent">
          {post && (
            <div
              className="card w-full shadow-md border rounded-md py-3 px-5 mx-auto"
              key={post.id}
            >
              <h1 className="card-header text-2xl font-semibold mb-2">
                {post?.title}
              </h1>
              <div className="card-body">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              <div className="card-footer mt-2 border-t py-3">
                <div className="flex justify-between">
                  <div className="block italic text-sm">
                    <Avatar name={post.user.username || post.user.name}  size='25' round className="mr-2" />
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
                          onClick={() => setOpenModal(true)}
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
          )}
        </div>
      </Container>
    </Dashboard>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const posts = await prisma.post.findMany();
  const paths = posts.map((post) => {
    return {
      params: { id: post.id.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const session = await getSession();
  const id = context.params?.id as string;
  const post = await prisma.post.findFirst({
    where: { id: id },
    include: {
      user: {
        select: {
          email: true,
          id: true,
          username: true,
          name: true,
          image: true
        },
      },
    },
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export default post;
