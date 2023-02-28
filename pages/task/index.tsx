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
import { PrismaClient, Task } from '@prisma/client';
import { formatDate } from 'utility/formatter';

// const tasks = [
//   { name: 'Html Task', graded: true },
//   { name: 'JavaScript Task', graded: false },
//   { name: 'TypeScript Task', graded: false },
//   { name: 'Golang Task', graded: false },
// ];

type Props = { data: Task[] };
const Tasks: NextPage<Props> = ({ data }) => {
  const [graded, setGraded] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deadline, setDeadline] = useState<unknown>();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(tasks);
    setTasks(data);
    let today = new Date();
    today.setDate(Date.now() + 5);
    console.log(today);
    let dt = new Date(Date.now() + 1000 * 24 * 5 * 60 * 60); //Sun Feb 20 2022
    setDeadline(() => formatDate(dt));
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [tasks]);

  async function submitHandler(e: any) {
    e.preventDefault();
    console.log('submitHandler');
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
          <div className="flex md:space-x-5">
            <Link href="/task/create" className="btn flex space-x-2">
              <MdAdd /> <span>Create Task</span>
            </Link>
          </div>
        </section>
        <div className="flex md:flex-row flex-col md:space-x-12 justify-between">
          <section className="md:w-1/2 mt-5">
            <h2 className="text-2xl">Submitted Tasks</h2>
            <div className="card py-5">
              <h4 className="text-lg font-semibold">
                You have Submitted a total of {tasks.length} tasks
              </h4>
              <p className="text-base mb-4">
                Below are the tasks you have Submitted
              </p>
              {tasks.length > 0 &&
                tasks.map((task: any) => (
                  <div
                    key={task.id}
                    draggable
                    className={checkClass(task?.graded)}
                  >
                    <div className="flex space-x-4 items-center text-gray-700">
                      <MdDragIndicator className="text-xl" />
                      <MdOutlineAssignmentTurnedIn />
                      <span className="font-bold">{task.title}</span>
                      {task?.graded && (
                        <MdDoneOutline className="text-emerald-500" />
                      )}
                    </div>
                    <div>Point: 25/30</div>
                  </div>
                ))}
            </div>
          </section>
          <section className="md:w-1/2">
            <h2 className="text-2xl">Tasks</h2>
            <div className="card">
              <h4 className="text-xl mb-4">Recent Task</h4>

              <div className="bg-gray-100 rounded border my-2 p-5 text-gray-700">
                <h3 className="text-lg font-bold">
                  Create a Eccomerce Rest API
                </h3>
                <p className="text-base mb-2">
                  Using Expres NodeJs Framework, Postman, Document all the
                  packages you use in the readme file
                </p>
                <div className="flex justify-between border-t-2">
                  <div className=" flex space-x-3 items-center">
                    <div className="font-bold">
                       {deadline as string}
                    </div>
                  </div>
                  {/* <div>{new Date().setDate().getHours()} Days left</div> */}
                  {/* <div>{new Date(Date.now() + 5).getHours()} Days left</div> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Dashboard>
  );
};

export default Tasks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany();
  return {
    props: {
      data: JSON.parse(JSON.stringify(tasks)),
    },
  };
};
