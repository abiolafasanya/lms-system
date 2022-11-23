import React from 'react';
import { Iprops } from './../../utility/interfaces';

const Card: React.FC<Iprops> = (props) => {
  return <div className={props.className + ' card'}>{props.children}</div>;
};

export default Card;
