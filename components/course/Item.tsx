import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency } from 'utility/formatter';
import { PrismaClient, Course } from '@prisma/client';

interface IProps extends Course {}

const Item = (props: IProps) => {
  return (
    <div className="bg-white dark:bg-gray-700 dark:text-gray-200 shadow-md rounded-md">
      <div className='w-[350px]'>
        <h3 className="text-center text-xl p-3 font-semibold capitalize">{props.name}</h3>
      <div className='w-full h-[150px]'>
      <Image
        src={props.image as string}
        className={'w-full h-full object-cover object-center'}
        width={150}
        height={150}
        alt={props.name}
      />
      </div>
      <div className='px-5 flex flex-col flex-wrap my-2'>
        <Link href={`#url`} className="font-semibold capitalize">{props.name}</Link>
          <div className='flex justify-between my-2'>
          <div>Rating {props?.stars  as number * 100}%</div>
          <div>{formatCurrency(props?.price as number)}</div>
          </div>
          <button className='btn rounded-sm'>Enroll</button>
      </div>
      </div>
    </div>
  );
};

export default Item;
