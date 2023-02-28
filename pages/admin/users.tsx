import Admin from '@layout/Admin';
import { User } from '@prisma/client';
import Axios from 'helper/axios';
import React, { useEffect, useState, useId } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import Search from '@utility/Search';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import styles from 'styles/AdminUser.module.css';
import { formatDate } from 'utility/formatter';
import Modal from '@utility/Modal';
import { AlertMsg } from '@utility/Alert';

const users = () => {
  const animatedComponents = makeAnimated();
  const [userData, setUserData] = useState<User[]>([]);
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'tutor', label: 'Tutor' },
    { value: 'admin', label: 'Admin' },
  ];

  const getUsers = async () => {
    const { data } = await Axios.get('/api/user/');
    return data.data;
  };

  useEffect(() => {
    const controller = new AbortController();

    getUsers()
      .then((users) => {
        setUserData(() => users);
        // console.log(users)
      })
      .catch((err) => err);

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUserData(() => users);
        // console.log(users)
      })
      .catch((err) => err);
  }, [modal]);

  const user = userData.filter((user) => user.role === 'user');
  const tutor = userData.filter((user) => user.role === 'tutor');
  const admin = userData.filter((user) => user.role === 'admin');

  async function deleteUser(id: string) {
    console.log('deleteUser', id);
    setModal((con) => !con);
    setUserId(() => id);

    // console.log('deleteUser', data);
    return;
  }

  async function action() {
    const { data } = await Axios.delete('/api/user/' + userId);
    console.log('deleteUser', data);
    setMessage(data.message);
  }

  return (
    <Admin>
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl">Users</h2>

        <div className="flex flex-wrap my-5 px-5 md:space-x-8 w-full items-center justify-center md:max-w-6xl mx-auto">
          <div className="flex flex-col items-center border shadow-md p-5 bg-white rounded-md text-gray-700 w-36 cursor-pointer">
            <h2 className="text-xl font-semibold">Admins</h2>
            <h3 className="text-lg font-semibold">{admin.length}</h3>
          </div>
          <div className="flex flex-col items-center border shadow-md p-5 bg-white rounded-md text-gray-700 w-36 cursor-pointer">
            <h2 className="text-xl font-semibold">Users</h2>
            <h3 className="text-lg font-semibold">{user.length}</h3>
          </div>
          <div className="flex flex-col items-center border shadow-md p-5 bg-white rounded-md text-gray-700 w-36 cursor-pointer">
            <h2 className="text-xl font-semibold">Tutors</h2>
            <h3 className="text-lg font-semibold">{tutor.length}</h3>
          </div>
        </div>
      </section>

      <Search />

      <section>
        <div className="">
          {modal && (
            <Modal
              title="Remove User"
              action={action}
              close={() => setModal(() => false)}
            >
              {message === '' ? (
                <h2 className="text-xl">
                  You are about to remove this user confirm delete
                </h2>
              ) : (
                <AlertMsg message={message} type="alert-info" />
              )}
            </Modal>
          )}
          <div className="card">
            <h2 className="text-2xl">Recent Users</h2>
            <div className={`${styles.container}`}>
              <table className={`${styles.table}`}>
                <thead className="border-b bg-gray-100  dark:bg-gray-700 dark:text-gray-300">
                  <tr className="">
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Register Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="dark:bg-gray-400 text-gray-900">
                  {userData.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{formatDate(new Date(user.createdAt))}</td>
                      <td className="flex space-x-2">
                        <button>
                          <FaEye className="text-gray-500 hover:text-gray-600" />
                        </button>
                        <button>
                          <FaEdit className="text-blue-500 hover:text-blue-600" />
                        </button>
                        <button onClick={() => deleteUser(user.id)}>
                          <FaTrash className="text-red-500 hover:text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between">
          <div className="card w-1/2">
            <h2 className="text-2xl">Create User</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button className="btn">Create User</button>
              </div>
            </form>
          </div>
          <div className="card w-1/2">
            <h2 className="text-2xl">Invite User</h2>
            <div className="form-group">
              <label htmlFor="" className="form-label">
                Role
              </label>
              <Select
                options={roleOptions}
                defaultValue={[roleOptions[0]]}
                id="role"
                className="dark:text-black"
                inputId="role"
                instanceId={useId()}
                components={animatedComponents}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userEmail" className="form-label">
                Email
              </label>
              <CreatableSelect
                components={animatedComponents}
                className="form-control"
                instanceId={useId()}
                inputId="userEmail"
                id="userEmail"
                isClearable
                isMulti
                placeholder="Add Email"
              />
            </div>
            <div className="form-group">
              <button className="btn">Send Invite Link</button>
            </div>
          </div>
        </div>
      </section>
    </Admin>
  );
};

export default users;
