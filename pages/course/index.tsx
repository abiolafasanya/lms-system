import React, { useState } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import { sideBarMenu, sideFooter, courseMenuItems } from 'data/index';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';
import Axios from 'helper/axios';
import { FaBars } from 'react-icons/fa';

export const getStaticProps: GetStaticProps = async (context) => {
  // const { data } = await Axios.get('/courses');

  return {
    props: {
      courses: [],
    },
  };
};

const index: NextPage = ({ courses }: any) => {
  // console.log(courses);
  const [showBar, setShowBar] = useState<boolean>(false);
  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'bg-[#eee] p-5 min-h-screen w-full'}>
        <section className="flex md:flex-row flex-col w-full">
          <main className="w-fit bg-slate-300 min-h-screen">
            Course content
          </main>
          <menu className="md:w-[156px] ml-auto">
            <FaBars onClick={() => setShowBar(!showBar)} />
            {showBar && (
              <ul className="border bg-white rounded shadow-sm card sm:px-2 md:px-5 py-5 w-fit">
                {courseMenuItems.map((menu, index) => (
                  <React.Fragment>
                    <li key={index}>
                      <Link
                        href={menu.link}
                        className="text-gray-800 hover:text-gray-500 px-2 py-1"
                      >
                        {menu.name}
                      </Link>
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
              </ul>
            )}
          </menu>
        </section>
      </Container>
    </Dashboard>
  );
};

export default index;
