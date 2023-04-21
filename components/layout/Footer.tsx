import React from 'react';
import { Iprops } from './../../utility/interfaces';

const Footer = () => {
  const date= new Date(Date.now()).getFullYear()
  
  return (
    <footer className="px-8 py-3 border-t">
      <div>
        <p className="text-center mx-auto">
          Powered by fastbeetech &copy; {date}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
