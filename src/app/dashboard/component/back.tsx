import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

const BackNavigation = ({ children, url }: { children?: ReactNode; url: string }) => {
  return (
    <div className="text-gray-500 flex gap-1">
      <span className="inline-flex gap-4">
        <Link href={url} className="flex gap-1">
          <ArrowLeft className="back-arrow" /> Back
        </Link>
        {children}
      </span>
    </div>
  );
};

export default BackNavigation;
