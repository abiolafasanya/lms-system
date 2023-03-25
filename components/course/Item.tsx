import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from 'utility/formatter';
import { PrismaClient, Course } from '@prisma/client';

interface IProps {
  courses: Course[];
}

const Item = ({courses}: IProps) => {
  return (
    <div>
      {  courses && 
            courses.map((course, index) => (
              <Link href={`/course/${course.id}`} key={index} className={cardStyle}>
                <div className={`${course.image ? `bg-url(${course.image}) object-cover object-center` : 'bg-gray-300'} px-5 py-14 rounded-t-md'`}>
                <h2 className='text-center text-lg font-semibold'>{course.title}</h2>
               </div>
            <div className='px-5 py-3'>
               <h2 className="font-semibold text-lg">{course.title}</h2>
              <p className='text-sm truncate text-clip' dangerouslySetInnerHTML={{ __html: course.description }}/>
              <div className='flex justify-between items-center jstext-sm mt-2'>
                <span className='text-sm'>Abiola Fasanya</span>
                <span className='text-sm text-blue-500 font-semibold'>{
                course.price === 0 ? 'free' : 
                formatCurrency(course.price as number)}
                </span>
              </div>
            </div>
          </Link>
            )
            )}
    </div>
      );
};

const formControl = 'py-3 px-5 h-12 border dark:border-none dark:bg-gray-200 dark:border-gray-600 dark:text-black outline-none dark:focus:border-white focus:border-blue-500 bg-white'
const btnStyle= 'py-3 px-5 h-12 bg-blue-500 hover:bg-blue-600  outline-none <rounded-r-sm></rounded-r-sm>'
const cardStyle= "rounded-b-md bg-white shadow-md hover:border-b hover:border-blue-500"

export default Item;
