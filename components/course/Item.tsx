import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from 'utility/formatter';
import { PrismaClient, Course } from '@prisma/client';

interface IProps {
  course: Course;
  url?: string;
}

const Item = ({ course, url }: IProps) => {
  const redirectUrl = url ? `${url}/${course.id}` : `/course/${course.id}`
  return (
    <Link href={redirectUrl} className={cardStyle}>
      <div className={`bg-gray-300 dark:bg-gray-400 px-5 py-14 rounded-t-md`}>
        <h2 className="text-center text-lg font-semibold">{course.title}</h2>
      </div>
      <div className="px-5 py-3">
        <h2 className="font-semibold text-lg">{course.title}</h2>
        <p
          className="text-sm truncate text-clip"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
        <div className="flex justify-between items-center jstext-sm mt-2">
          <span className="text-sm">Abiola Fasanya</span>
          <span className="text-sm text-blue-500 font-semibold">
            {course.price === 0
              ? 'free'
              : formatCurrency(course.price as number)}
          </span>
        </div>
      </div>
    </Link>
  );
};

const cardStyle =
  'rounded-b-md bg-white dark:bg-gray-700 shadow-md hover:border-b hover:border-blue-500 dark:border-gray-500';

export default Item;
