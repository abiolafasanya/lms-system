import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import Item from 'components/course/Item';
import { sideBarMenu, sideFooter } from 'data/index';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient, Course } from '@prisma/client';



interface CourseProps {
  courses: Course[];
}

const filterList = [
  'Development', 'Teaching', ' IT & Softwares', 
  ' Office Productivity', 'Engineering','Entrepreneur', 
  'Health & Fitness', 'Music', 'Design', 'Marketing'
]

const Index: NextPage<CourseProps> = ({ courses }) => {
  // console.log(courses);
  const [showBar, setShowBar] = useState<boolean>(false);
  return (
    <Tutor menu={sideBarMenu} footer={sideFooter}>
      <Container className={'dark:bg-gray-800 bg-[#eee] min-h-screen w-full'}>
        <section className="sm:hidden md:flex w-full">
          <aside className="p-5 h-screen w-[25%] bg-white dark:bg-gray-700 dark:text-gray-50 shadow-md">
            <menu className="flex space-y-3 flex-col flex-wrap">
            { filterList.map((list, index) => (
              <Link key={index} href={`#non`} className="course-link">
                {list}
              </Link>
             ))
             }
            </menu>
          </aside>
          <main className="w-[100%]">
            <div className="w-3/4 mx-auto my-10 flex flex-col">
              <Link href={'/tutor/course/create'} className="btn mb-4 ml-auto">
                Add Course
              </Link>
              <input
                type="search"
                name="search"
                id="search"
                className="form-control rounded-sm flex placeholder:text-center"
                placeholder="Search"
              />
            </div>

            <div className="md:mx-5 dark:bg-gray-800 dark:text-gray-100 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {courses.map((course, index) => (
                <Item
                  key={index}
                  {...course}
                />
              ))}
            </div>
          </main>
        </section>
        <section></section>
        <section></section>
      </Container>
    </Tutor>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const course = await prisma.course.findMany();

  return {
    props: {
      courses: JSON.parse(JSON.stringify(course)),
    },
  };
};
