import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import {AlertMsg} from '@utility/Alert';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient, Task, Submission } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Axios from 'helper/axios';
import { useSession, getSession } from 'next-auth/react';

interface Iprops {
  data: Task;
  submissionData: Submission;
}

interface TaskDoc extends Task {
  Submission: Submission[]
}
const index: NextPage<Iprops> = ({ data , submissionData}) => {
  const router = useRouter()
  const {data: session} = useSession();
  const userSession = session?.user.id as string

  const [task, setTask] = useState<Task>();
  const [submission, setSubmission] = useState<Submission>()
  const [submitLink, setSubmitLink] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setTask(() => data);
    setSubmission(() => submissionData);
  }, []);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      task: { files: any; value: string };
    };
    // console.log('submitHandler');
    let file: any;
    if (target.task.files) {
      file = target.task.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my-uploads');
    let URLCloudinary =
    'https://api.cloudinary.com/v1_1/fastbeetech/image/upload';
     
    let upload = await fetch(URLCloudinary, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => data.secure_url)
      file = upload
    } else {
      file = target.task.value;
    }
    
    if (file === null || file === '' || file === undefined) {
      setError(true)
      setMessage('please select a file or paste a link')
      setTimeout(() => cleanup(), 5000)
      return
    }
    setSubmitted(con => !con)


    const body = {file, taskId: task?.id}
    
    const { data, status } = await Axios.post('/api/task/submit', body);
    if (data.error) {
      console.log(data.error);
      setError(true)
      setMessage(data.message)
      setTimeout(() => cleanup(), 5000)
      return;
    }
    if (status === 200) {
      setSuccess(true)
      setMessage(data.message)
      setTimeout(() => cleanup(), 5000)
      router.push('/task')
      return;
    }
  }

  function cleanup() {
    setError(false)
    setSuccess(false)
    setMessage('')
    setSubmitted(false)
  }

  return (
    <Dashboard>
      <Container className="min-h-screen md:max-w-6xl mx-auto">
        <section className="">
          <h2 className="text-2xl">Submit Task</h2>
          <div className="text-gray-500">
            <span>
             <Link href="/task">Task</Link> &larr;{' '}
            {task?.id}
            </span>
          </div>
          {success && <AlertMsg type='alert-success' message={message} />}
          {error && <AlertMsg type='alert-error' message={message} />}
          <div className="card">
            <h2 className="text-lg">Task</h2>
            <div
              className="my-1"
              dangerouslySetInnerHTML={{ __html: task?.description as string }}
            />
            <h3 className="font-semibold text-base">Attachment</h3>
            {task?.attachment ? (
              <Link href={task?.attachment as string} className="text-blue-500">
                Click on link to view resource
              </Link>
            ) : (
              <span>N/A</span>
            )}
            <h3 className="font-semibold text-base">Resources</h3>
            <h4 className="text-base">N/A</h4>
            <h3 className="font-semibold text-base">Point</h3>
            <h4 className="text-base">{task?.point}</h4>
            
                 {submission?.userId === userSession ?  (
              <div className='text-base'>You have already submitted</div>
                 ): (
                  <>
                  <div className="flex space-x-5 mt-4">
                    <button
                      className={submitLink === false ? 'text-blue-500' : undefined}
                      onClick={() => setSubmitLink(() => false)}
                    >
                      Submit File
                    </button>
                    <button
                      className={submitLink ? 'text-blue-500' : undefined}
                      onClick={() => setSubmitLink(() => true)}
                    >
                      Submit Link
                    </button>
                  </div>
                  <form onSubmit={submitHandler}>
                  
                  {submitLink ? (
                    <div className="form-group">
                      <label htmlFor="task" className="form-label">
                        Submit with Link
                      </label>
                      <input
                        type="text"
                        name="task"
                        id="task"
                        className="form-control"
                      />
                    </div>
                  ) : (
                    <div className="form-group">
                      <label htmlFor="" className="form-label">
                        Upload Task
                      </label>
                      <input
                        type="file"
                        name="task"
                        id="task"
                        className="file-input"
                      />
                    </div>
                  )}
                  <div className="form-group">
                    {
                      submitted ?
                     ( <button type="button" className="btn flex items-center space-x-4" disabled>
                      <Image className="animate-spin h-5 w-5 mr-3" alt='spinner' width={5} height={5} src="/loading.png" />
                      Processing...
                       </button>) :
                    (<button className="btn">Submit</button>)
    
                    }
                  </div>
                </form>
                </>
                 )}
          </div>
        </section>
      </Container>
    </Dashboard>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const session = await getSession(context)
  // console.log(`getServerSideProps ${id}`);
  const prisma = new PrismaClient();
  const task = await prisma.task.findUnique({ where: { id: id }, include: {Submission: true} });
  const subs = await prisma.submission.findFirst({ where: {
    userId: session?.user.id as string,
    taskId: id
  }
});
  return {
    props: {
      data: JSON.parse(JSON.stringify(task)),
      submissionData: JSON.parse(JSON.stringify(subs)),
    },
  };
};