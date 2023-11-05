'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import { UserType } from '../page';
import { useRouter } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

const Welcome = ({ user }: { user: UserType }) => {
  const router = useRouter();
  function hanldeRedirect() {
    if (!user) return redirectToSignIn();
    // router.push(`/dashboard/${user.role.toLocaleLowerCase()}`)
    router.push(`/dashboard/`);
  }
  return (
    <section className="md:max-w-6xl mx-auto w-full sm min-h-[80vh] h-full flex px-5 flex-col md:flex-row items-center justify-center">
      <Image src={'./gif/education.svg'} className="w-full h-[50vh]" height={500} width={500} alt="learning" />
      <div className="flex flex-col py-8 text-gray-900 dark:text-gray-300">
        <h3 className="sm:text-lg sm:px-5 md:px-0 md:text-2xl font-semibold sm:text-center md:text-left">
          KodeInspired LMS provides an all-in-one platform for learning and upgrading the skill set
        </h3>

        <div className="mt-5">
          <Button onClick={hanldeRedirect}>Go to Dashboard</Button>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
