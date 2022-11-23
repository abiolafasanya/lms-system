import React, { useState, useEffect } from 'react';
import Sidebar from '../utility/Sidebar';
import { FaBell, FaCaretDown } from 'react-icons/fa';
import { sideBarMenu, sideFooter } from '../../data/index';
import { MdChat } from 'react-icons/md';
import Avatar, { ConfigProvider } from 'react-avatar';
import Link from 'next/link';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { PropTypes } from 'utility/types';
import { useSession, getSession } from 'next-auth/react';
import Head from 'next/head';
// import propType from 'prop-types'

const Dashboard: React.FC<PropTypes> = (props) => {
  const [open, setOpen] = useState(false);
  const [caret, setCaret] = useState(false);
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const { status, data: session } = useSession();

  function toggle() {
    setOpen(!open);
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    setTimeout(() => {
      // console.log(status, session, auth);
      setAuth({ status, session, isAuth: true });
    }, 500);
  }, [status]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for TSCAPP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex bg-[#eee]">
        <Sidebar
          footer={sideFooter}
          menu={sideBarMenu}
          className={`${
            open ? 'w-72' : 'w-20'
          } duration-300 fixed bg-white  h-full min-h-screen`}
          action={toggle}
        />
        <main className={`${open ? 'ml-72' : 'ml-20'} duration-300 w-full`}>
          <header className="flex w-full px-5">
            <div className="w-50 ml-auto p-5 flex items-center space-x-5">
              <MdChat />
              <span className="relative rounded-full p-2 bg-white">
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
                // textSizeRatio={2.0}
              />
              <h5 onClick={() => setCaret(!caret)}>
                {session?.user?.name || 'Guest'}
              </h5>
              {/* <span className="rounded-full px-3 py-2 border text-center bg-white">
                AF
              </span> */}
              <span className="mt-2 relative z-50">
                <FaCaretDown
                  // onMouseDown={() => setCaret(false)}
                  // onMouseEnter={() => setCaret(true)}
                  onKeyDown={() => setCaret(false)}
                  // onBlur={() => setCaret(false)}
                  onClick={() => setCaret(!caret)}
                />
                {caret && (
                  <div className="absolute border bg-white w-48 rounded shadow-sm sm:-right-4 sm:top-8 md:top-8 md:right-0">
                    <ul onMouseLeave={() => setCaret(false)}>
                      {
                        // props.header !== undefined &&
                        props.header?.map((header: any, id: any) => (
                          <>
                            <Link href={header.link} className="text-sm">
                              <li
                                key={id}
                                className="px-5 py-2 hover:bg-gray-100"
                              >
                                {header.name}
                              </li>
                            </Link>
                            <hr />
                          </>
                        ))
                      }
                    </ul>
                  </div>
                )}
              </span>
            </div>
          </header>
          <section className="mx-auto">{props.children}</section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
