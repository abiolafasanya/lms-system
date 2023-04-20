import { Assessment, Progress } from '@prisma/client';
import { response } from 'express';
import Axios from 'helper/axios';

interface fetchDoc {
  url: string;
  config: any;
}

export const fetcher = ({ url, config }: fetchDoc) => {
  const res = fetch(url, config);
  new Promise((resolve, reject) => {
    resolve(res);
    reject(new Error('Could not process request successfully'));
  });
};

type progressType = {
  userId?: string | null;
  courseId?: string | null;
  lessonId?: string | null;
  taskId?: string | null;
  progress?: Progress | null;
  assessment?: Assessment | null;
  lastVisit?: string | Date;
  lastOperation?: string;
  isCompleted?: boolean | null;
};
export async function userTracker(body: progressType) {
  const { data } = await Axios.post('/api/progress', body).then(
    (response) => response
  );
  return {data};
}

