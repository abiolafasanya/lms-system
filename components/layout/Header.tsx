import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { PropTypes } from 'utility/types';

const Header: React.FC<PropTypes> = (props) => {
  const { data: session, status } = useSession();
  const [auth, setAuth] = useState<boolean>(false);
  const [headData, setHeadData] = useState({
    title: 'Dashboard',
    content: 'Learning Management Dashboard',
  });
  useEffect(() => {
    if (status === 'authenticated') {
      setAuth(true);
    }
    if (status === 'unauthenticated') {
      setAuth(false);
    }
  }, [status]);

  useEffect(() => {
    setHeadData({
      title: props.title !== '' ? props.title : headData.title,
      content: props.content !== '' ? props.content : headData.content,
    });
  }, []);
  return (
    <header>
      <Head>
        <title>{headData.title}</title>
        <meta name="description" content={headData.content} />
        <meta name="about" content="Learning Management System suitable for almost everything" />
        <meta name="author" content="abiola fasanya" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <nav className="font-montserrat flex justify-between items-center py-3 sm:px-1 md:px-8 lg:max-w-6xl w-full lg:mx-auto border-b">
        <div className="font-bold text-2xl">TSCAPP</div>
        {auth && (
          <ul className="flex sm:space-x-3 md:space-x-8">
            <li>
              <Link href="/dashboard" className='text-blue-500 dark:text-gray-100 font-semibold'>Dashboard</Link>
            </li>
          </ul>
        )}
        <div className="flex space-x-4">
          {auth ? (
            <>
              <button
                onClick={() => signOut()}
                className="btn bg-blue-600 hover:bg-blue-700 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn bg-gray-600 hover:bg-gray-700"
                onClick={() => signIn()}
              >
                Login
              </button>
              <Link href="/auth/register">
                <button className="btn bg-blue-600 hover:bg-blue-700 text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
