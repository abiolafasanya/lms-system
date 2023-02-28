import React, { useState } from 'react';
import { Iprops, SideMenu } from './../../utility/interfaces';
import {
  FaArrowCircleRight,
  FaArrowAltCircleLeft,
  FaSignOutAlt,
} from 'react-icons/fa';

import Link from 'next/link';
import { MdSearch } from 'react-icons/md';
import { motion } from 'framer-motion';

const Sidebar: React.FC<Iprops & SideMenu> = (props) => {
  const [open, setOpen] = useState(false);
  const { menu, footer } = props;
  function toggleIcon(e: any) {
    setOpen(!open);
    e();
  }
  return (
    <div className={props.className}>
      <section className="relative">
        <header className="md:p-5">
          <h1
            className={`font-semibold ${
              open ? 'sm:text-4xl sm:py-5 sm:px-5 md:text-2xl' : 'text-lg p-2'
            }`}
          >
            {open ? 'TSCAPP' : 'TA'}
          </h1>
          <button
            className="absolute sm:-right-3 sm:top-4 md:right-[-15px] cursor-pointer"
            onClick={() => toggleIcon(props.action)}
          >
            {open ? (
              <FaArrowAltCircleLeft className="sm:hidden md:flex md:text-[24px] duration-500 transition-all" />
            ) : (
              <FaArrowCircleRight className="sm:hidden md:flex md:text-[24px] duration-500 transition-all" />
            )}
          </button>
        </header>
        <main>
          <ul className="px-5 py-3 flex flex-col">
            <li className="relative">
              <input
                type="search"
                placeholder="Search"
                className="placeholder:sm:text-2xl placeholder:md:text-lg form-control dark:bg-gray-800"
              />
              <MdSearch
                className={`${
                  open ? 'sm:right-3 md:right-5' : 'right-2'
                } absolute  sm:text-4xl md:text-2xl text-gray-500  sm:top-4 md:top-5`}
              />
            </li>
          </ul>
          <div className="border dark:border-gray-300 my-4"></div>
          <ul className="p-5 flex flex-col space-y-2">
            {menu.map((menu, id) => (
              <Link href={menu.link} key={id}>
                <li className="flex dark:hover:text-gray-900 space-x-4 items-center hover:bg-gray-300 p-2 rounded">
                  <menu.icon
                    className={`${
                      open ? 'sm:text-5xl md:text-xl' : 'sm:text-3xl md:text-xl'
                    }`}
                  />
                  {open && (
                    <span className="sm:text-2xl md:text-sm font-semibold">
                      {menu.name}
                    </span>
                  )}
                </li>
              </Link>
            ))}
          </ul>
          <div className="border border-gray-300 my-2"></div>
        </main>
        <footer className="px-5">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:space-y-2 sm:mt-3 md:mt-px md:space-y-1"
          >
            {footer.map((footer: any, id: any) => (
              <Link href={footer.link} key={id}>
                <motion.li className="flex dark:hover:text-gray-900 space-x-4 items-center hover:bg-gray-300 p-2 rounded">
                  <footer.icon
                    className={`${
                      open ? 'sm:text-5xl md:text-xl' : 'sm:text-3xl md:text-xl'
                    }`}
                  />
                  {open && (
                    <span className="sm:text-2xl md:text-sm font-semibold">
                      {footer.name}
                    </span>
                  )}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        </footer>
      </section>
    </div>
  );
};

export default Sidebar;
