import React, { useState } from 'react';
import { Iprops, SideMenu } from './../../utility/interfaces';
import {
  FaArrowCircleRight,
  FaArrowAltCircleLeft,
  FaSignOutAlt,
} from 'react-icons/fa';

import Link from 'next/link';
import { MdSearch } from 'react-icons/md';

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
        <header className="md:p-5 p-3">
          <h1 className={`font-semibold ${open ? 'text-2xl' : 'text-lg p-2'}`}>
            {open ? 'TSCAPP' : 'TA'}
          </h1>
          <button
            className="absolute right-[-15px] cursor-pointer"
            onClick={() => toggleIcon(props.action)}
          >
            {open ? (
              <FaArrowAltCircleLeft className="text-[24px] duration-500 transition-all" />
            ) : (
              <FaArrowCircleRight className="text-[24px] duration-500 transition-all" />
            )}
          </button>
        </header>
        <main>
          <ul className="px-5 py-3 flex flex-col">
            <li className="relative">
              <input
                type="search"
                placeholder="search course, category"
                className="form-control dark:bg-gray-800"
              />
              <MdSearch
                className={`${
                  open ? 'right-5' : 'right-2'
                } absolute  text-[22px] text-gray-500  top-5`}
              />
            </li>
          </ul>
          <div className="border dark:border-gray-300 my-4"></div>
          <ul className="p-5 flex flex-col space-y-2">
            {menu.map((menu, id) => (
              <Link href={menu.link} key={id}>
                <li className="flex dark:hover:text-gray-900 space-x-4 items-center hover:bg-gray-300 p-2 rounded">
                  <menu.icon
                    className={`${open ? 'text-[18px]' : 'text-[20px]'}`}
                  />
                  {open && <span>{menu.name}</span>}
                </li>
              </Link>
            ))}
          </ul>
          <div className="border border-gray-300 my-2"></div>
        </main>
        <footer className="md:px-5 px-3 ">
          <ul className="flex flex-col space-y-1">
            {footer.map((footer: any, id: any) => (
              <Link href={footer.link} key={id}>
                <li className="flex dark:hover:text-gray-900 space-x-4 items-center hover:bg-gray-300 p-2 rounded">
                  <footer.icon
                    className={`${open ? 'text-[18px]' : 'text-[20px]'}`}
                  />
                  {open && <span>{footer.name}</span>}
                </li>
              </Link>
            ))}
          </ul>
        </footer>
      </section>
    </div>
  );
};

export default Sidebar;
