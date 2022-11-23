import React, { ReactNode } from 'react';
import { Iprops } from './../../utility/interfaces';

const Button:React.FC<Iprops> = ({ action, children, className, type }) => {
  return (
    <button type="button" className={className + ' btn'} onClick={action}>
      {children}
    </button>
  );
};

export default Button;
