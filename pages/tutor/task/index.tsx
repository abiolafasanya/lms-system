import React, { useState, useEffect, useId } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import classNames from 'classnames';
import {
  MdAdd,
  MdDragIndicator,
  MdDoneOutline,
  MdOutlineAssignmentTurnedIn,
  MdViewColumn,
  MdPreview,
} from 'react-icons/md';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient, Task } from '@prisma/client';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CustomTable } from '@utility/Table';
import { BsViewList } from 'react-icons/bs';

const header = ['S/N', 'Title', 'Description', 'Deadline', 'View'];

const animatedComponents = makeAnimated();

const selectOptions = [
  { value: 'general', label: 'General' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'FullStack' },
];

type Props = { data: Task[] };
const Tasks: NextPage<Props> = ({ data }) => {
  const [graded, setGraded] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deadline, setDeadline] = useState<any>(NaN);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(tasks);
    setTasks(data);
    let today = new Date();
    today.setDate(Date.now() + 5);
    console.log(today); //Sun Feb 20 2022
    setDeadline(
      new Date(Date.now() + 1000 * 24 * 5 * 60 * 60).toLocaleString()
    );
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
      <Container className="h-screen">
        <div className="flex space-x-6 my-4">
          <Link href="/tutor/task/create" className="btn flex space-x-2">
            <MdAdd /> <span>Create Task</span>
          </Link>
          <Link
            href="/tutor/task/createTeam"
            className="btn bg-gray-500 hover:bg-gray-600 flex space-x-2 items-center"
          >
            <MdAdd /> <span>Create Team Task</span>
          </Link>
        </div>
        <section className="flex md:flex-row flex-col justify-between items-center">
          <div className="form-group">
            <Select
              instanceId={useId()}
              closeMenuOnSelect={false}
              components={animatedComponents}
              inputId="category"
              defaultValue={[selectOptions[0]]}
              // isMulti
              name="colors"
              // onChange={(e) => setCategory(e.map((item) => item.value))}
              options={selectOptions}
              className="basic-multi-select md:w-[350px] dark:text-black"
              classNamePrefix="select"
            />
          </div>
          <div className="form-group">
            <input
              type="search"
              placeholder="Search for tasks..."
              className="form-control md:w-[350px] border"
            />
          </div>
        </section>
        <section>
          <CustomTable header={header}>
            {tasks.length > 0 &&
              tasks.map((task, index) => (
                <>
                  <tr className="table-row">
                    <td className="table-data">{index + 1}</td>
                    <td className="table-data">{task.title}</td>

                    <td
                      dangerouslySetInnerHTML={{ __html: task.description }}
                      className="table-data"
                    />
                    <td className="table-data">
                      {
                        new Date(
                          task?.deadline
                        ).toLocaleString() as unknown as string
                      }
                    </td>
                    <td className="items-center table-data">
                      <Link
                        href={`/tutor/task/${task.id}/submission`}
                        className="flex items-center space-x-2"
                      >
                        <MdPreview /> visit
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
          </CustomTable>
        </section>
      </Container>
    </Dashboard>
  );
};

export default Tasks;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany().finally(async () => {
    prisma.$disconnect();
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(tasks)),
    },
  };
};
