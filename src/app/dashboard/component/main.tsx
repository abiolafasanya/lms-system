'use client';
import { ModeToggle } from '@/components/mode-toggle';
import { UserButton, useUser } from '@clerk/nextjs';
import { Fragment, ReactNode, useEffect, useState } from 'react';
import Loader from '@/components/shared/loader/loader';

const Main = ({ children, role = 'User' }: { children: ReactNode; role?: string }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const handleLoading = () => setIsLoading(false);
  useEffect(() => {
    handleLoading();
  }, [isLoading]);
  return (
    <Fragment>
      {isLoading ? <Loader /> : null}
      {!isLoading ? (
        <section className="w-full md:w-4/5 py-5 px-5 md:px-14 h-screen  overflow-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg">{role}</h3>
            </div>
            <div className="flex items-center gap-5">
              <h4 className="hidden md:inline-flex">{user?.fullName || user?.username}</h4>
              <UserButton afterSignOutUrl="/" userProfileUrl="/profile" />
              <ModeToggle />
            </div>
          </div>
          {children}
        </section>
      ) : null}
    </Fragment>
  );
};

export default Main;
