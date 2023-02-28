import React, { useState, useEffect } from 'react';
import Sidebar from '@utility/Sidebar';
import { FaBell, FaCaretDown } from 'react-icons/fa';
import { adminSideBar, sideFooter, headMenu } from 'data/index';
import { MdChat } from 'react-icons/md';
import Avatar from 'react-avatar';
import Link from 'next/link';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { PropTypes } from 'utility/types';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { motion1 } from 'data/motion';
import { NextPage } from 'next';
import NoSSR from 'components/NoSSR';
import Container from '@utility/Container';

const Toggle = dynamic(() => import('@utility/Toggle'), { ssr: false });

const Admin: NextPage<PropTypes> = (props) => {
  const [open, setOpen] = useState(false);
  const [caret, setCaret] = useState(false);
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const { status, data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [dropdown, setDropDown] = useState<typeof headMenu>([]);

  const ToggleIconClass = classNames([
    'rounded-full px-4 border-[3px] bg-white border-gray-500',
    {
      'border-orange-500': theme === 'dark' && true,
      'border-black': theme === 'light' && true,
    },
  ]);

  function toggle() {
    setOpen(!open);
  }

  function toggleHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }
  useEffect(() => {
    const controller = new AbortController();
    console.log(theme);

    return () => {
      controller.abort();
    };
  }, [theme]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session?.user.role === 'tutor') {
      router.push('/tutor');
    }
    if (session?.user.role === 'user') {
      router.push('/dashboard');
    }
    setDropDown(props.header || (headMenu as typeof headMenu));
    setAuth({ status, session, isAuth: true });
  }, [status]);

  return (
    <NoSSR>
      {!session ||
        (session?.user.role !== 'admin' && (
          <div className="alert-info mx-auto mt-8 max-w-3xl">
            You are not authorized to access this page
          </div>
        ))}
      {session && session?.user.role === 'admin' && (
        <div className="font-montserrat px-0 bg-gray-100">
          <Head>
            <title>Dashboard</title>
            <meta name="description" content="Dashboard for TSCAPP" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="flex dark:bg-gray-800 px-0 dark:text-gray-100 bg-gray-100 text-black">
            <Sidebar
              menu={props?.sidebar || adminSideBar}
              footer={props?.footer || sideFooter}
              className={`${
                open ? 'w-72 ease-out' : 'w-20 ease-in'
              } duration-300 fixed bg-white h-full min-h-screen dark:bg-gray-900 dark:text-gray-50`}
              action={toggle}
            />
            <main
              className={`${
                open ? 'ml-72' : 'ml-20'
              } duration-300 w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-50`}
            >
              <header className="flex w-full md:px-5">
                <div className="ml-auto p-5 flex items-center space-x-5">
                  <MdChat />
                  <span className="relative rounded-full p-2 bg-white dark:bg-gray-700">
                    {' '}
                    <FaBell />
                    <span className="absolute bg-red-500 text-red-50 text-[0.7rem] top-0 right-2 px-[0.05rem]">
                      1
                    </span>
                  </span>
                  <Avatar
                    name={session?.user?.name || 'Guest'}
                    size="40"
                    color="gray"
                    round
                    onClick={() => setCaret(!caret)}
                    className="cursor-pointer"
                  />
                  <h5 onClick={() => setCaret(!caret)}>
                    {session?.user?.name || 'Guest'}
                  </h5>

                  <span className="mt-2 relative z-50">
                    <FaCaretDown
                      onKeyDown={() => setCaret(false)}
                      onClick={() => setCaret(!caret)}
                    />

                    {caret && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // variants={motion1}
                        className="dropdown-menu"
                      >
                        <menu className="flex flex-col">
                          {dropdown?.map((header, index) => (
                            <Link
                              key={index}
                              href={header.link}
                              className="sm:text-md md:text-sm px-5 py-4 hover:bg-gray-100"
                            >
                              {header.name}
                            </Link>
                          ))}
                        </menu>
                      </motion.div>
                    )}
                  </span>
                  <Toggle action={toggleHandler} className={ToggleIconClass} />
                </div>
              </header>
              <section className="md:mx-auto text-black dark:text-gray-100 ">
                <Container>{props.children}</Container>
              </section>
            </main>
          </div>
        </div>
      )}
    </NoSSR>
  );
};

export default Admin;
