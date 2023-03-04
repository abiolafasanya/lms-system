import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import Item from 'components/course/Item';
import { sideBarMenu, sideFooter, courseMenuItems } from 'data/index';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';
import { PrismaClient, Course } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';



interface CourseProps {
  courses: Course[];
}

const Index: NextPage<CourseProps> = ({ courses }) => {
  // console.log(courses);
  const [showBar, setShowBar] = useState<boolean>(false);
  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'dark:bg-gray-800 bg-[#eee] min-h-screen w-full'}>
        <section className="sm:hidden md:flex w-full">
          <aside className="p-5 h-screen w-[25%] bg-white dark:bg-gray-700 dark:text-gray-50 shadow-md">
            <menu className="flex space-y-3 flex-col flex-wrap">
              <Link href={`#non`} className="course-link">
                Teaching
              </Link>
              <Link href={`#non`} className="course-link">
                Development
              </Link>
              <Link href={`#non`} className="course-link">
                IT & Softwares
              </Link>
              <Link href={`#non`} className="course-link">
                Office Productivity
              </Link>
              <Link href={`#non`} className="course-link">
                Engineering
              </Link>
              <Link href={`#non`} className="course-link">
                Entrepreneur
              </Link>
              <Link href={`#non`} className="course-link">
                Health & Fitness
              </Link>
              <Link href={`#non`} className="course-link">
                Music
              </Link>
              <Link href={`#non`} className="course-link">
                Design
              </Link>
              <Link href={`#non`} className="course-link">
                Marketing
              </Link>
            </menu>
          </aside>
          <main className="w-[100%]">
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
              {courses.map((course, index) => (
                <Item
                  key={index}
                  image={course?.image as string}
                  // link={course.link}
                  title={course?.name}
                  price={course?.price as number}
                  author={course?.userId as string}
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

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
  const prisma = new PrismaClient();
  const course = await prisma.course.findMany();

  return {
    props: {
      courses: JSON.parse(JSON.stringify(course)),
    },
  };
};
