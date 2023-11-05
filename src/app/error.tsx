'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Image src={'/500.svg'} width={300} height={300} alt="error" className="rounded-full" />
      <div className="max-w-[500px] flex flex-col gap-2 items-center justify-center text-center ">
        <p className="text-gray-600">{error?.message || 'Something Went Wrong'}</p>
        <p className="font-semibold">
          Apologies for the inconvenience, but an error has occurred. Please retry your request. {error?.digest}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 my-4">
        <Button onClick={reset}>Try again</Button>
        <Link href={'/'}>
          <Button variant="outline">Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
