'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface NotFoundProps {
  error: Error;
  reset: () => void;
}

export default function NotFound({ error, reset }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Image src={'/error.svg'} width={300} height={300} alt="error" className="rounded-full" />
      <div className="max-w-[500px] flex flex-col gap-2 items-center justify-center text-center ">
        <h1 className="text-2xl font-semibold">{error?.message || 'Page not found'}</h1>
        <p className="text-stone-600">Oops, the page you are trying to access cannot be located.</p>
      </div>
      <div className="flex items-center justify-center gap-4 my-5">
        <Button onClick={reset}>Try again</Button>
        <Link href={'/'}>
          <Button variant="outline">Go Back</Button>
        </Link>
      </div>
    </div>
  );
}
