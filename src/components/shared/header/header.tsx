'use client';
import React from 'react';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="md:max-w-6xl flex items-center justify-between pt-5 mx-auto w-full">
      <h3 className="text-xl font-semibold">KodeInspire LMS</h3>
      <div className="flex gap-2 items-center">
        {!isSignedIn ? <SignInButton /> : <DashboardButton />}
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  );
};

const DashboardButton = () => (
  <Link href={'/dashboard'}>
    <Button variant="link">Dashboard</Button>
  </Link>
);

export default Header;
