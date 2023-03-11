import React from 'react'
import {GetServerSideProps} from 'next';
import { getSession } from 'next-auth/react';
import {FaTasks, FaSchool } from 'react-icons/fa';

import {
    GoInfo,
  } from 'react-icons/go';
  
  import {
    MdArticle,

  } from 'react-icons/md';
import { PrismaClient, Course, User, Post, Task, Submission } from '@prisma/client';
  
interface Iprops {
    courses?: Course[];
    posts?: Post[];
    users?: User[];
    tasks?: Task[];
    submissions?: Submission[];
}

const Status: React.FC<Iprops> = ({courses, users, posts, tasks, submissions}) => {
    const statusBar = [
        {
          name: 'User', icon: FaSchool, count: users?.length,
        },
        {
          name: 'Post', icon: MdArticle, count: posts?.length,
        },
        {
          name: 'Task', icon: FaTasks, count: tasks?.length
        },
        {
          name: 'Submission', icon: GoInfo, count: submissions?.length
        },
      ]
  return (
    <section className="flex md:flex-row flex-col w-full">
              {
                statusBar.length > 0 && 
                statusBar.map((status, index) => (
                  <div key={index} className="md:w-1/4 card flex sm:flex-col md:flex-row md:space-x-4 items-center p-5 rounded border dark:border-none">
                   <status.icon className="text-[48px] text-black dark:text-gray-300" />
                   <div className="text-black dark:text-gray-300">
                    <h5>{status.name}</h5>
                    <h2 className="text-2xl font-bold rounded-full p-1 text-center mx-auto dark:border-gray-300 border-gray-800 border-2 w-[48px] border-dark">
                    {status?.count}
                    </h2>
                   </div>
                  </div>
                ))
           }
            </section>
  )
}

export default Status
