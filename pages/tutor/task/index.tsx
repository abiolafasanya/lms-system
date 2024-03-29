import React, { useState, useEffect, useId } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import classNames from 'classnames';
import Axios from 'helper/axios';
import { MdAdd, MdPreview } from 'react-icons/md';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient, Task } from '@prisma/client';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CustomTable } from '@utility/Table';
import { BsTrash } from 'react-icons/bs';
import Modal from '@utility/Modal';
import { AlertMsg } from '@utility/Alert';

const header = ['S/N', 'Title', 'Description', 'Deadline', 'Action'];

const animatedComponents = makeAnimated();

const selectOptions = [
  { value: 'general', label: 'General' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'FullStack' },
];

type Props = { data: Task[] };
const Tasks: NextPage<Props> = ({ data }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    setTasks(data);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        setTasks(() => tasks);
      })
      .catch((err) => err);
  }, [deleteModal]);

  const getTasks = async () => {
    const { data } = await Axios.get('/api/task/');
    return data.task;
  };

  async function deleteTask(id: string) {
    setDeleteModal((con) => !con);
    setTaskId(() => id);
    return;
  }

  async function action() {
    const { data } = await Axios.delete('/api/task/' + taskId);
    setMessage(data.message);
  }

  return (
    <Tutor>
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
          {deleteModal && (
            <Modal
              title="Remove User"
              action={action}
              close={() => setDeleteModal(() => false)}
            >
              {message === '' ? (
                <h2 className="text-xl">
                  You are about to remove task {taskId} confirm to delete
                </h2>
              ) : (
                <AlertMsg message={message} type="alert-info" />
              )}
            </Modal>
          )}
          <CustomTable header={header}>
            {tasks?.length > 0 &&
              tasks.map((task, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-data">{index + 1}</td>
                    <td className="table-data">{task.title}</td>

                    <td
                      dangerouslySetInnerHTML={{ __html: task.description }}
                      className="table-data whitespace-normal"
                    />
                    <td className="table-data">
                      {
                        new Date(
                          task?.deadline
                        ).toLocaleString() as unknown as string
                      }
                    </td>
                    <td className="items-center table-data flex space-x-2">
                      <Link
                        href={`/tutor/task/${task.id}/`}
                        className="flex items-center space-x-2"
                        title="view"
                      >
                        <MdPreview className="text-blue-500 text-lg" />
                      </Link>
                      <button
                        onClick={() => deleteTask(task.id)}
                        title="delete"
                      >
                        <BsTrash className="text-red-500 text-lg" />
                      </button>
                    </td>
                  </tr>
              ))}
          </CustomTable>
        </section>
      </Container>
    </Tutor>
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
