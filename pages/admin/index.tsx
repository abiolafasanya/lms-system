import Admin from '@layout/Admin'
import React from 'react'
import { motion } from 'framer-motion';
import Container from '@utility/Container';
import Status from '@utility/Status'
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

  return (
    <Admin>
      <Container className="sm:px-5 md:px-0 md:mx-auto md:max-w-6xl">
        <h2 className="text-2xl font-semibold py-4">Dashboard</h2>
        <Status users={users} tasks={tasks} posts={posts} submissions={submissions}/>
      </Container>
    </Admin>
  );
};

export default index


export const getServerSideProps: GetServerSideProps = async(context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()
  const courses = await prisma.course.findMany()
  const tasks = await prisma.task.findMany()
  const submissions = await prisma.submission.findMany()
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
