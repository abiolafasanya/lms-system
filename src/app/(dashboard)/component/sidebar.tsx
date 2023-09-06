"use client"

import { Input } from "@/components/ui/input";
import { sideBarMenus } from "@/data/menus";
import { Search } from "lucide-react";
import Link from "next/link";
import Logo from "@/app/(dashboard)/component/logo";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-2 w-1/4 max-w-[300px] bg-gray-50 dark:bg-special-600 dark:text-gray-200 h-screen overflow-hidden px-5 pt-5">
      <Logo />
      <div className="relative py-5">
        <Input type="search" className="dark:bg-special-500"/>
        <Search className="absolute top-7 right-2 text-gray-500" />
      </div>
      <menu>
        {sideBarMenus.map((menu, i) => (
          <Link
          key={i*Date.now()}
            href={menu.link}
            className="flex gap-4 px-1 py-2 dark:hover:bg-gray-600 hover:bg-gray-200 w-full rounded-md cursor-pointer"
          >
            <span>{<menu.icon className="" size={24} />}</span>
            <span className="">{menu.name}</span>
          </Link>
        ))}
      </menu>
    </div>
  );
};

export default SideBar;
