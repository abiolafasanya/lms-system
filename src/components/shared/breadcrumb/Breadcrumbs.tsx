'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface IBreadCrumb {
  pathName?: string;
}

function Breadcrumbs({ pathName }: IBreadCrumb) {
  const path = usePathname();
  // Extract dynamic route parameters from the pathname
  const routeArr = pathName
    ? pathName.replace(/_/g, ' ').split('?')[0].split('/').filter(Boolean)
    : path.replace(/_/g, ' ').split('?')[0].split('/').filter(Boolean);

  // Build the breadcrumb elements
  const breadcrumbs = routeArr.map((el, i) => (
    <span key={i}>
      {i > 0 && <span className="mx-2">{'>'}</span>}
      {i + 1 === routeArr.length ? (
        <span className="text-stone-500">{el.split('-').join(' ').replaceAll('%20', ' ')}</span>
      ) : (
        <Link href={`/${routeArr.slice(0, i + 1).join('/')}`}>{el.split('-').join(' ').replaceAll('%20', ' ')}</Link>
      )}
    </span>
  ));

  return (
    <div className="py-5 md:py-3 text-stone-900 capitalize">
      <div className="flex flex-wrap">
        {/* <Link href="/dashboard">Home</Link> */}
        {breadcrumbs}
      </div>
    </div>
  );
}

export default Breadcrumbs;
