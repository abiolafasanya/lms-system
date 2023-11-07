import { Skeleton } from '@/components/ui/skeleton';

function SkeletonLoader() {
  return (
    <div className="max-w-[250px] w-full">
      <div className="space-y-2">
        <div className="flex items-start space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2">
            {' '}
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>
        <Skeleton className="h-[250px] w-[250px]" />
      </div>
    </div>
  );
}
export default function Loader() {
  return (
    <div className="flex items-center gap-5 justify-center w-full h-screen">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  );
}
