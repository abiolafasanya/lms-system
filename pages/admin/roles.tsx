import React, { useEffect, useState, useRef } from 'react';
import Admin from '@layout/Admin';
import { PrismaClient, User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { MdEdit } from 'react-icons/md';
import Alert, { AlertMsg } from '@utility/Alert';
import Axios from 'helper/axios';
import { FaTimes } from 'react-icons/fa';

type Iprops = {
  users: User[];
};
const roles = ({ users }: Iprops) => {
  const [maxUser, setMaxUser] = useState(Math.min(users.length, 6));
  const [usersData, setUserData] = useState(() => users);
  const [isData, setIsData] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [search, setSearch] = useState<User[] | null>();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch && setOnSearch(true);
  }, [onSearch]);

  useEffect(() => {
    const controller = new AbortController();
    const users = async () => {
      const { data } = await Axios.get('/api/user/', {
        signal: controller.signal,
      });
      return data.data;
    };

    users()
      .then((users) => {
        setUserData(() => users);
      })
      .catch((err) => err);

    return () => {
      controller.abort();
    };
  }, [isData]);

  // const filterUser = usersData.filter('');

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    console.log(target.search.value);
    const input = target.search.value;
    const { data, status } = await Axios.get(
      `/api/user/search?username=${input}`
    );
    if (data.error) {
      console.log(data.error);
      return null;
    }
    if (status === 200) {
      console.log(data);
      setOnSearch(() => true);
      setSearch([data.data]);
      return;
    }
  }

  return (
    <Admin>
      <section className="w-full md:max-w-6xl mx-auto">
        <h2 className="text-2xl">Assign Role</h2>
        <div className="w-full my-8">
          <form onSubmit={handleSearch} className="flex space-x-4 items-center">
            <input
              type="search"
              ref={searchRef}
              id="search"
              className="px-5 py-2"
            />
            <button className="btn">Search</button>
          </form>
          {onSearch ? (
            <menu className="card">
              {search?.map((user, index) => (
                <div key={index}>
                  {user ? (
                    <UserRow key={index} user={user} setIsData={setIsData} />
                  ) : (
                    <>
                      <AlertMsg
                        key={index}
                        type={'alert-info'}
                        message="No user found"
                      />
                    </>
                  )}
                </div>
              ))}
            </menu>
          ) : (
            <menu className="card">
              {usersData.map((user, index) => (
                <UserRow key={index} user={user} setIsData={setIsData} />
              ))}
            </menu>
          )}
        </div>
      </section>
    </Admin>
  );
};

export default roles;

type userRowType = {
  user: User;
  setIsData: React.Dispatch<React.SetStateAction<boolean>>;
};
const UserRow: React.FC<userRowType> = ({ user, setIsData }) => {
  const [roleModal, setRoleModal] = useState(false);

  return (
    <div key={user.id}>
      <div className="p-2 rounded-sm relative flex justify-between">
        <h3>{user?.name ? user.name : (user.username as string)}</h3>
        <div className="">
          <span>{user?.role as string}</span>
          {roleModal && (
            <ChangeRole
              role={user?.role as string}
              id={user.id}
              setIsData={setIsData}
              setRoleModal={setRoleModal}
            />
          )}
        </div>
        <div>
          <button
            onClick={() =>
              setRoleModal((state) => {
                setIsData((on) => !on);
                return !state;
              })
            }
          >
            <MdEdit className="text-2xl hover:text-blue-500" />
          </button>
        </div>
      </div>
      <div className="border-b"></div>
    </div>
  );
};

type RoleType = {
  setRoleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsData: React.Dispatch<React.SetStateAction<boolean>>;
  role: string;
  id: string;
};
const ChangeRole: React.FC<RoleType> = ({
  role,
  id,
  setRoleModal,
  setIsData,
}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      role: { value: string };
    };
    let role = target.role;
    console.log('role is chanded to:', role.value);
    const body = { role: role.value, id: id };

    function cleanup() {
      setTimeout(() => {
        setError(false);
        setSuccess(false);
        setMessage('');
      }, 3000);
    }

    const { status, data } = await Axios.patch('/api/user/role', body);
    if (data.error) {
      console.log(data.error);
      setError(() => true);
      setMessage(data.message);
      cleanup();
      return;
    }
    if (status === 200) {
      console.log(data);
      setMessage(data.message);
      setSuccess(true);
      cleanup();
      return;
    }
  }

  return (
    <div className="flex flex-col absolute shadow-md top-0 md:left-48 z-50 card sm:w-5/6 md:w-1/2">
      {error && <AlertMsg type="alert-error" message={message} />}
      {success && <AlertMsg type="alert-success" message={message} />}
      <button
        onClick={() => {
          setRoleModal((isModal) => {
            setIsData((on) => !on);
            return !isModal;
          });
        }}
      >
        <FaTimes className="text-2xl ml-auto text-red-500" />
      </button>
      <form onSubmit={handler}>
        <div className="form-group">
          <label htmlFor="role" className="form-label">
            Update Role
          </label>
          <select
            name="role"
            id="role"
            defaultValue={role}
            className="form-control"
          >
            <option value="admin">Admin</option>
            <option value="tutor">Tutor</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="form-group">
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } });
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
