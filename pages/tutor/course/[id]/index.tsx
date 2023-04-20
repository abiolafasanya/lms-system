import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Modules from 'components/course/Modules';
import { Lesson, Course, Module, PrismaClient, User } from '@prisma/client';

const courseCurriculum = [
  {
    id: 1,
    title: 'HTML Fundamentals',
    courseId: 1,
    topics: [
      {
        id: 1,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 2,
        title: 'Introduction to HTML',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 3,
        title: 'Text Element',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 4,
        title: 'More Text Element: Lists',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 5,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
    ],
  },
  {
    id: 2,
    title: 'HTML Fundamentals',
    courseId: 1,
    topics: [
      {
        id: 1,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 2,
        title: 'Introduction to HTML',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 3,
        title: 'Text Element',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 4,
        title: 'More Text Element: Lists',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 5,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
    ],
  },
  {
    id: 3,
    title: 'HTML Fundamentals',
    courseId: 1,
    topics: [
      {
        id: 1,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 2,
        title: 'Introduction to HTML',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 3,
        title: 'Text Element',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 4,
        title: 'More Text Element: Lists',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 5,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
    ],
  },
  {
    id: 4,
    title: 'HTML Fundamentals',
    courseId: 1,
    topics: [
      {
        id: 1,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 2,
        title: 'Introduction to HTML',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 3,
        title: 'Text Element',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 4,
        title: 'More Text Element: Lists',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 5,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
    ],
  },
  {
    id: 5,
    title: 'HTML Fundamentals',
    courseId: 1,
    topics: [
      {
        id: 1,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 2,
        title: 'Introduction to HTML',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 3,
        title: 'Text Element',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 4,
        title: 'More Text Element: Lists',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
      {
        id: 5,
        title: 'Section Intro',
        video: 'https://youtube.com',
        duration: new Date(Date.now()),
      },
    ],
  },
];

type Iprops = {
  course: Course & {
    user: User;
    modules: ICourse[];
  };
};

interface ICourse extends Module {
  lessons: Lesson[];
}

const show: NextPage<Iprops> = ({ course }) => {

  return (
    <Tutor>
      <Container>
        <div className="text-gray-500  mb-4 flex justify-between items-center">
          <span>
            <Link href="/tutor/course">Course</Link> &larr; Create Course
          </span>
        </div>
        <header className={headerStyle}>
          <h2 className="sm:text-2xl md:text-3xl font-semibold   text-center">
            {course.title}
          </h2>
          <Link
            href={`/tutor/course/${course.id}/content`}
            className="btn rounded-full inline-block"
          >
            Edit Content
          </Link>
        </header>
        <section className="max-w-2xl mx-auto mt-14 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-center">
            About this course
          </h2>
          <p
            className="text-base text-center"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
        </section>

        <Modules modules={course.modules} />
      </Container>
    </Tutor>
  );
};

const headerStyle = 'bg-gray-300 dark:bg-gray-700 py-24 px-7 flex flex-col space-y-8 justify-center items-center ';
export default show;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const prisma = new PrismaClient();
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      modules: { include: { lessons: true } },
      user: {
        select: {
          name: true,
          image: true,
          id: true,
          email: true,
        },
      },
    },
  });

  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
    },
  };
};