'use client';
import Image from 'next/image';
import { Upload } from '../components/uploads/Button';
import { useState } from 'react';
import { UploadFileResponse } from 'uploadthing/client';

export default function Page() {
  const [images, setImages] = useState<UploadFileResponse[]>([]);
  function getResponse(response: UploadFileResponse[]) {
    setImages(response);
  }
  return (
    <div>
      <div className="w-full h-full mt-12 max-w-6xl mx-auto">
        <Upload response={getResponse} />
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {images.length
            ? images.map((image) => (
                <Image
                  key={image?.key}
                  src={image?.url}
                  width={500}
                  height={500}
                  alt={image?.name}
                  className="w-auto h-auto object-center object-cover"
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
