import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import Link from 'next/link';
import UseAuth from 'hooks/useAuth';
import { AlertMsg } from '@utility/Alert';
import { PrismaClient, Course, Module, User } from '@prisma/client';
import { NextPage, GetServerSideProps } from 'next';
import AddLesson from 'components/course/AddLesson';
import AddModule from 'components/course/AddModule';

interface ICourse extends Course {
  modules: Module[];
  author: User;
  courseId: string;
}

type Iprops = {
  course: ICourse
}


const curriculum: NextPage<Iprops> = ({course}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const [tab, setTab] = useState(false);

  // useEffect(() => {
  //   console.log("modules", course.modules)
  // })

  function cleanup() {
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setMessage('');
    }, 3000);
  }

  return (
    <Tutor>
      <Container
        className={`min-h-screen md:max-w-6xl mx-auto dark:text-gray-100`}
      >
        <main className="w-full">
          <section>
            <div className="text-gray-500 mb-4 flex justify-between items-center">
              <span>
                <Link href="/tutor/course">Course</Link> &larr; Create Course
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                {tab ? (
                  <h1 className="text-2xl">Create Module</h1>
                ) : (
                  <h1 className="text-2xl">Add Lesson</h1>
                )}
              </div>
              <div className="flex space-x-5">
                <button
                  onClick={() => setTab(false)}
                  className="px-5 py-2 text-blue-500 hover:text-blue-600"
                >
                  Add Lesson
                </button>
                <button
                  onClick={() => setTab(true)}
                  className="px-Content5 py-2 text-blue-500 hover:text-blue-600"
                >
                  Create Module
                </button>
              </div>
            </div>
            <div className="card text-dark ">
              {error && <AlertMsg type="alert-error" message={message} />}
              {success && <AlertMsg type="alert-success" message={message} />}

              {tab ? (
                <AddModule
                  cleanup={cleanup}
                  courseId={course.id}
                  setError={setError}
                  setSuccess={setSuccess}
                  setMessage={setMessage}
                />
              ) : (
                <AddLesson cleanup={cleanup} 
                courseId={course.id} 
                modules={course.modules}
                setError={setError}
                setSuccess={setSuccess}
                setMessage={setMessage} />
              )}
            </div>
          </section>
        </main>
      </Container>
    </Tutor>
  );
};

export default curriculum;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const id = context.query.id as string;
  const course = await prisma.course.findUnique({ where: { id }, include: {
    modules: true
  } });
  return {
    props: {
      course: JSON.parse(JSON.stringify(course)),
      courseId: id,
    },
  };
};
