"use client";
import ContentLoader, { Instagram } from 'react-content-loader'

const Loader = () => {
  return (
    <div className="flex gap-5 justify-center w-4/5 py-5 px-14 h-screen">
        <Instagram className="animate-pulse dark:bg-special-600" animate animateBegin="1"/>
        <Instagram className="animate-pulse dark:bg-special-600" animate animateBegin="2"/>
        <Instagram className="animate-pulse dark:bg-special-600" animate animateBegin="3"/>
    </div>
  );
};

export default Loader;
