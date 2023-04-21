import React from 'react';

const Footer = () => {
  const date= new Date(Date.now()).getFullYear()
  
  return (
    <footer className="px-8 py-3 border-t">
      <div>
        <p className="text-center mx-auto">
          Dev-Habiola &copy; {date}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
