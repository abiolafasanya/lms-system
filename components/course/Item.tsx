import React from 'react';
import Image from 'next/image';
import { formatCurrency } from 'utility/formatter';
import { Decimal } from '@prisma/client/runtime';

interface courseProps {
  title: string;
  image: string;
  author?: string;
  price?: number | Decimal;
  link?: string;
  rating?: number;
}

const Item = (props: courseProps) => {
  return (
    <div className="card p-0 rounded-sm">
      <Image
        src={props.image}
        className={'w-full h-fit shrink-0 object-cover'}
        width={500}
        height={500}
        alt={props.title}
      />
      <div className='p-3 flex flex-col flex-wrap'>
          <h3 className="font-semibold capitalize">{props.title}</h3>
          <div>Rating {0.9 * 100}%</div>
          <div>{formatCurrency(props?.price as number)}</div>
      </div>
    </div>
  );
};

export default Item;
