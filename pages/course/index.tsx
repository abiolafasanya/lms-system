import React, { useState } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import Item from 'components/course/Item';
import { sideBarMenu, sideFooter, courseMenuItems } from 'data/index';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';
import Axios from 'helper/axios';
import { FaBars } from 'react-icons/fa';

const data = [
  {
    image:
      'https://img.freepik.com/free-photo/online-web-design_53876-95309.jpg?w=740&t=st=1674932357~exp=1674932957~hmac=31f0eba74fea21f89d3369114aa60ec0c130fcc37d84a024af889bc50472e9ab',
    link: '/course',
    title: 'course item one',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-photo/sofware-developer-thinking-while-touching-beard-while-typing-laptop-sitting-desk-with-multiple-screens-parsing-code-focused-database-admin-working-with-team-coding-background_482257-33556.jpg?w=826&t=st=1674932480~exp=1674933080~hmac=f313ab78b785657e93f2891fbc99a68194998935f931767983fdb7242b803c84',
    link: '/course',
    title: 'Introduction to HTML',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-vector/code-testing-cartoon-banner-functional-test-methodology-programming-search-errors-bugs-website-platform-development-dashboard-usability-optimization-computer-pc-vector-illustration_107791-3766.jpg?w=900&t=st=1674932503~exp=1674933103~hmac=57314ae362ebf3b5e98908e15ee3d07d5c607a1e8874d91914832652fae7fa5d',
    link: '/course',
    title: 'Software Development Fundamental',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept-bright-vibrant-violet-isolated-illustration_335657-986.jpg?w=740&t=st=1674932650~exp=1674933250~hmac=d1ecb1b712112f6b2caa08eea3612aa67d39457e18d775c205b7b349b89ca6c5',
    link: '/course',
    title: 'Understanding JavaScript',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
  {
    image:
      'https://img.freepik.com/free-photo/ai-nuclear-energy-background-future-innovation-disruptive-technology_53876-129783.jpg?w=740&t=st=1674932726~exp=1674933326~hmac=7150d8bdc9704f154605adcc6717e4fe7c45f5cb09e5c9338a3f027ed23644c5',
    link: '/course',
    title: 'Robotics Engineering',
    price: 5000,
    authour: 'Abiola Fasanya',
  },
];

const index: NextPage = ({ courses }: any) => {
  // console.log(courses);
  const [showBar, setShowBar] = useState<boolean>(false);
  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'dark:bg-gray-800 bg-[#eee] min-h-screen w-full'}>
        <section className="sm:hidden md:flex w-full">
          <aside className="p-5 h-screen w-[25%] bg-white dark:bg-gray-700 dark:text-gray-50 shadow-md">
            <ul className="flex space-y-3 flex-col flex-wrap">
              <li>Teaching</li>
              <li>Development</li>
              <li>IT & Softwares</li>
              <li>Office Productivity</li>
              <li>Engineering</li>
              <li>Entrepreneur</li>
              <li>Health & Fitness</li>
              <li>Music</li>
              <li>Design</li>
              <li>Marketing</li>
            </ul>
          </aside>
          <main className="w-[75%]">
            <div className="w-3/4 mx-auto my-10">
              <input
                type="search"
                name="search"
                id="search"
                className="form-control rounded-full flex placeholder:text-center"
                placeholder="Search"
              />
            </div>

            <div className="dark:bg-gray-800 dark:text-gray-100 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {data.map((course, index) => (
                <Item
                  key={index}
                  image={course.image}
                  link={course.link}
                  title={course.title}
                  price={course.price}
                  authour={course.authour}
                />
              ))}
            </div>
          </main>
        </section>
        <section></section>
        <section></section>
      </Container>
    </Dashboard>
  );
};

export default index;

export const getStaticProps: GetStaticProps = async (context) => {
  // const { data } = await Axios.get('/courses');

  return {
    props: {
      courses: [],
    },
  };
};
