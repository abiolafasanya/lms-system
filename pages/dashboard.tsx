import React, { useState, useLayoutEffect } from 'react';
import { FaSchool, FaTasks, FaInfoCircle } from 'react-icons/fa';
import { GoInfo } from 'react-icons/go';
import Dashboard from 'components/layout/Dashboard';
import Container from 'components/utility/Container';
import Status from '@utility/Status'
import Alert from 'components/utility/Alert';
import { ThreeCircles } from 'react-loader-spinner';
import {GetServerSideProps, NextPage} from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient, Course, User, Post, Task, Submission } from '@prisma/client';
  
interface Iprops {
    courses: Course[];
    posts: Post[];
    users: User[];
    tasks: Task[];
    submissions: Submission[];
}

const index: NextPage<Iprops> = ({courses, users, posts, tasks, submissions}) => {
  const [alert, setAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setAlert(false);
    setLoading(true);
    setTimeout(() => {
      setAlert(true);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <ThreeCircles
          height="100"
          width="100"
          color="#4b556380"
          wrapperStyle={{}}
          wrapperClass="flex items-center justify-center my-auto sm:my-60 lg:my-64"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#4b556380"
          innerCircleColor="#4b556380"
          middleCircleColor="#4b556380"
        />
      ) : (
        <Dashboard>
          {alert && (
            <Alert type={true} className="alert-info mx-5 md:mx-28">
              <h1 className="text-lg font-bold text-center my-2 flex items-center justify-center">
                <FaInfoCircle className="mr-2" /> Announcement
              </h1>
              <p className="text-base py-3">
                A new Assignment has been droped on the portal kindly visit the
                assignment area to find your course assignment
              </p>
            </Alert>
          )}
          <Container className="sm:px-5 w-full mx-auto md:max-w-6xl">
            <h2 className="text-2xl font-semibold py-4">Dashboard &larr; Student</h2>
            <Status users={users} tasks={tasks} posts={posts} submissions={submissions}/>
          </Container>
        </Dashboard>
      )}
    </>
  );
};

export default index;


export const getServerSideProps: GetServerSideProps = async(context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()
  const courses = await prisma.course.findMany()
  const tasks = await prisma.task.findMany()
  const submissions = await prisma.submission.findMany({where: {userId: session?.user.id as string}})
  return {
      props: {
          users: JSON.parse(JSON.stringify(users)),
          courses: JSON.parse(JSON.stringify(courses)),
          posts: JSON.parse(JSON.stringify(posts)),
          tasks: JSON.parse(JSON.stringify(tasks)),
          submissions: JSON.parse(JSON.stringify(submissions)),
      }
  }
}