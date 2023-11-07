'use client';
import { Input } from '@/components/ui/input';
import { sideBarMenus } from '@/data/menus';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/app/dashboard/component/logo';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type SideBarProps = (typeof sideBarMenus)[0];

const SideBar = ({ sidebar }: { sidebar: SideBarProps[] }) => {
  const pathName = usePathname();
  return (
    <div className="hidden md:flex flex-col gap-2 w-1/4 max-w-[300px] h-screen overflow-hidden px-5 pt-5 shadow">
      <Logo />
      <div className="relative py-5">
        <Input type="search" className="" />
        <Search className="absolute top-7 right-2 " />
      </div>
      <menu>
        {sidebar.map((menu, i) => {
          const isActive = menu.link === pathName;
          return (
            <Link
              key={menu.name}
              href={menu.link}
              className={clsx('flex gap-4 px-1 py-2 w-full hover:bg-primary-foreground/90 rounded-md cursor-pointer', {
                'dark:bg-primary-foreground bg-primary/10': isActive,
              })}
            >
              <span>{<menu.icon className="" size={24} />}</span>
              <span className="">{menu.name}</span>
            </Link>
          );
        })}
      </menu>
    </div>
  );
};

export default SideBar;
