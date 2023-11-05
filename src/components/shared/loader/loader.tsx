'use client';
import { Instagram } from 'react-content-loader';

const Loader = () => {
  return (
    <div className="flex gap-5 justify-center w-4/5 py-5 px-14 h-screen">
      <Instagram className="animate-pulse" animate animateBegin="1" />
      <Instagram className="animate-pulse" animate animateBegin="2" />
      <Instagram className="animate-pulse" animate animateBegin="3" />
    </div>
  );
};

export default Loader;
