'use client';

import { cn } from '@/lib/utils';
import { UploadButton } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
import { UploadFileResponse } from 'uploadthing/client';

export function Upload({
  className,
  response,
}: {
  className?: string;
  response?: (val: UploadFileResponse[]) => void;
}) {
  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        className={cn('ut-button:text-primary-foreground', className)}
        appearance={{
          button: 'ut-ready:bg-primary ut-uploading:cursor-not-allowed bg-primary/70 bg-none after:bg-stone-500',
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          console.log('Upload Completed');
          if (!res) return;
          if (typeof response === 'function') {
            response(res);
          }
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
}
