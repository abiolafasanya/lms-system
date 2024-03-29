import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import Item from 'components/course/Item';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient, Course } from '@prisma/client';
import {BsSearch} from 'react-icons/bs'
import {formatCurrency} from 'utility/formatter'
import Link from 'next/link';


interface CourseProps {
  courses: Course[];
}

const Index: NextPage<CourseProps> = ({ courses }) => {
  // console.log(courses);
  const [showBar, setShowBar] = useState<boolean>(false);
  return (
    <Dashboard>
      <Container className={'dark:bg-gray-800 min-h-screen w-full'}>
        <section>
          <div className="max-w-6xl mx-auto flex justify-between items-center">

            <div className='flex md:space-x-14'>
            <div className='flex space-x-4'>
            <h3 className='text-lg'>Category</h3>
              <select>
                <option>All</option>
              </select>
            </div>
            
            <div className='flex space-x-4'>
            <h3 className='text-lg'>Authour</h3>
              <select>
                <option>All</option>
              </select>
            </div>
            </div>

            <div>
              <form>
                  <div className='form-group flex'>
                    <input type="search" id="search" className={formControl} />
                    <button className={btnStyle} ><BsSearch color="white"/></button>
                  </div>
              </form>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl mb-2">Courses</h2>
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3  w-full">
              {courses &&
                courses.map((course, index) => (<Item key={index} course={course} />))}
            </div>
          </div>
        </section>
      </Container>
    </Dashboard>
  );
};        


const formControl = 'py-3 px-5 h-12 border dark:border-none dark:bg-gray-200 dark:border-gray-600 dark:text-black outline-none dark:focus:border-white focus:border-blue-500 bg-white'
const btnStyle= 'py-3 px-5 h-12 bg-blue-500 hover:bg-blue-600  outline-none <rounded-r-sm></rounded-r-sm>'
const cardStyle= "rounded-b-md bg-white shadow-md hover:border-b hover:border-blue-500"

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
