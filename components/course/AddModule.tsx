import React from 'react';
import Axios from 'helper/axios';
import Link from 'next/link';
import { Course } from '@prisma/client';

type Props = {
  cleanup: () => void;
  courseId: string;
  setError: (err: boolean) => void;
  setSuccess: (success: boolean) => void;
  setMessage: (msg: string) => void;
};

const CurriculumForm: React.FC<Props> = ({
  cleanup,
  courseId,
  setMessage,
  setError,
  setSuccess,
}) => {
  async function handleCurriculum(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLInputElement & {
      title: { value: string };
    };
    const title = target.title.value;
    const EndPoint = `/api/course/${courseId}/module`;
    console.log(title, EndPoint);
    const body = { title, courseId };

    const { data, status } = await Axios.post(EndPoint, body);
    if (data.error) {
      setError(true);
      setMessage('An error was encountered try again later!');
      cleanup();
    }
    if (status === 200) {
      setSuccess(true);
      setMessage('Curriculum created');
      cleanup();
    }
  }

  return (
    <form onSubmit={handleCurriculum}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input type="text" id="title" className="form-control" />
      </div>
      <div className="form-group">
        <button className="btn">Add Curriculum</button>
      </div>
    </form>
  );
};

export default CurriculumForm;
