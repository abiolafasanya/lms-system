import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import classNames from 'classnames';
import {
  MdAdd,
  MdDragIndicator,
  MdDoneOutline,
  MdOutlineAssignmentTurnedIn,
  MdTimer,
} from 'react-icons/md';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient, Task, Submission } from '@prisma/client';
import { formatDate } from 'utility/formatter';
import Modal from '@utility/Modal';

// const tasks = [
//   { name: 'Html Task', graded: true },
//   { name: 'JavaScript Task', graded: false },
//   { name: 'TypeScript Task', graded: false },
//   { name: 'Golang Task', graded: false },
// ];

interface Iprops {
  data: Task[];
  submitted: SubmissionDoc[];
}

interface SubmissionDoc extends Submission {
  task: Task;
}

type Props = { data: Task[]; submitted: Submission[] };
const Tasks: NextPage<Iprops> = ({ data, submitted }) => {
  const [graded, setGraded] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deadline, setDeadline] = useState<unknown>();
  const [submissions, setSubmissions] = useState<SubmissionDoc[]>([]);
  const [isFeedbackModal, setIsFeedbackModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    console.log(tasks);
    setTasks(data);
    setSubmissions(() => submitted);
    console.log(submissions);
    return () => {
      isMounted = false;
    };
  }, [tasks]);

  function showFeedback() {
    setIsFeedbackModal(!isFeedbackModal);
  }

  function closeFeedback() {
    setIsFeedbackModal(false);
  }

  const checkClass = (graded: boolean = false) =>
    classNames(
      'flex justify-between my-2 items-center py-5 px-7 bg-white/50 border overflow-clip',
      {
        'border-l-4 border-l-emerald-500 bg-emerald-50': graded,
      }
    );

  return (
    <Dashboard>
      <Container className="px-5 sm:min-h-screen">
        <section className="flex md:flex-row flex-col justify-between items-center">
          <div className="form-group mb-4">
            <input
              type="search"
              placeholder="Search for tasks..."
              className="form-control md:w-64"
            />
          </div>
        </section>
        <div className="flex md:flex-row flex-col md:space-x-12 justify-between">
          <section className="md:w-1/2 mt-5">
            <h2 className="text-2xl">Submitted Tasks</h2>
            <div className="card py-5">
              <h4 className="text-lg font-semibold">
                You have Submitted a total of {submissions?.length} tasks
              </h4>
              <p className="text-base mb-4">
                Below are the tasks you have Submitted
              </p>
              {submissions?.length > 0 &&
                submissions?.map((submission) => (
                  <div
                    key={submission.id}
                    draggable
                    className={checkClass(submission?.graded)}
                  >
                    {isFeedbackModal && (
                      <Modal
                        title="Task Feedback"
                        action={showFeedback}
                        close={closeFeedback}
                        hideConfirm={true}
                        key={Date.now()}
                      >
                        <div>
                          <h2 className="font-semibold text-blue-600">
                            Feedback:
                          </h2>
                          <p className="text-base">{submission?.feedback}</p>
                        </div>
                        <div>
                          <h2 className="font-semibold text-blue-600">
                            Feedback By:
                          </h2>
                          <p className="text-base">Dashboard</p>
                        </div>
                        <div>
                          <h2 className="font-semibold text-blue-600">Time</h2>
                          <div className="text-base">
                            {submission?.gradedAt ? (
                              new Date(submission?.gradedAt).toLocaleString()
                            ) : (
                              <span>N/A</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h2 className="font-semibold text-blue-600">
                            Re-Graded:
                          </h2>
                          <p className="text-base">
                            {submission?.graded ? 'Graded' : 'Not Graded'}
                          </p>
                        </div>
                        <div>
                          <h2 className="font-semibold text-blue-600">
                            Re-Graded:
                          </h2>
                          <p className="text-base">
                            {submission?.regraded ? 'Regraded' : 'Not Regraded'}
                          </p>
                        </div>
                      </Modal>
                    )}
                    <div className="flex space-x-4 items-center text-gray-700">
                      <MdDragIndicator className="text-xl" />
                      <MdOutlineAssignmentTurnedIn />
                      <span className="font-bold">
                        {submission?.task.title}
                      </span>
                      {submission?.graded && (
                        <MdDoneOutline className="text-emerald-500" />
                      )}
                    </div>
                    <div>Point: {submission?.score}</div>
                    <button
                      className="btn bg-emerald-500 hover:bg-emerald-600 text-emerald-900"
                      onClick={(e) => showFeedback()}
                    >
                      Feedback
                    </button>
                    {/* <Link href={`/task/${submission?.taskId}/submission`} >View</Link> */}
                  </div>
                ))}
            </div>
          </section>
          <section className="md:w-1/2">
            <h2 className="text-2xl">Tasks</h2>
            <div className="card">
              <h4 className="text-xl mb-4">Recent Task</h4>
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-100 rounded border my-2 p-5 text-gray-700"
                  >
                    <h3 className="text-lg font-bold">
                      {/* Create a Eccomerce Rest API */}
                      {task.title}
                    </h3>
                    <p
                      className="text-base mb-2"
                      dangerouslySetInnerHTML={{ __html: task.description }}
                    />
                    {/* Using Expres NodeJs Framework, Postman, Document all the
                  packages you use in the readme file */}
                    <div className="flex justify-between my-2">
                      <span className="font-semibold">{task.point} Points</span>
                      <Link
                        href={`/task/${task.id}`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        view
                      </Link>
                    </div>
                    <div className="flex justify-between border-t-2">
                      <div className=" flex space-x-3 items-center">
                        <div className="font-bold">
                          {formatDate(new Date(task.deadline)) as string}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </Container>
    </Dashboard>
  );
};

export default Tasks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany();
  const id = session?.user.id as string;
  const userTasks = await prisma.submission.findMany({
    where: { userId: id },
    include: { task: true },
  });
  console.log(userTasks, id);
  return {
    props: {
      data: JSON.parse(JSON.stringify(tasks)),
      submitted: JSON.parse(JSON.stringify(userTasks)),
    },
  };
};
