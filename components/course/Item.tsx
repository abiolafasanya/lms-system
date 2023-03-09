import React from 'react';
import Image from 'next/image';
import { formatCurrency } from 'utility/formatter';
import { PrismaClient, Course } from '@prisma/client';

interface IProps extends Course {}

const Item = (props: IProps) => {
  return (
    <div className="card p-0 rounded-sm">
      <div className='w-64 h-[280px] bb-2 border-b'>
      <Image
        src={props.image as string}
        className={'w-full object-cover object-center'}
        width={256}
        height={256}
        alt={props.name}
      />
      </div>
      <div className='px-5 flex flex-col flex-wrap'>
          <h3 className="font-semibold capitalize">{props.name}</h3>
          <div>Rating {props?.stars  as number * 100}%</div>
          <div>{formatCurrency(props?.price as number)}</div>
      </div>
    </div>
  );
};

export default Item;
