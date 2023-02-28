import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { AlertMsg } from '@utility/Alert';
import { sideBarMenu, sideFooter } from 'data/index';
import { GetStaticProps, NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';
import { User, PrismaClient } from '@prisma/client';
import Axios from 'helper/axios';
import { useSession, getSession } from 'next-auth/react';
import { MdPending, MdVerified } from 'react-icons/md';

const account: NextPage<{ data: User }> = ({ data }) => {
  const [user, setUser] = useState<User>(() => data);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const findUser = async () => {
    const { data } = await Axios.get('/api/user/' + user.id);
    return data.data;
  };

  useEffect(() => {
    findUser()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => err);
  }, [loading]);

  function cleanup() {
    setTimeout(() => {
      setSuccess(false);
      setError(false);
      setMessage('');
      setLoading(false);
    }, 3000);
  }

  async function updateAccount(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      fullname: { value: string };
      username: { value: string };
    };

    const { fullname, username } = target;
    console.log(fullname.value, username.value);
    const body = { name: fullname.value, username: username.value };
    const { data, status } = await Axios.patch('/api/user/' + user.id, body);
    if (data.error) {
      setLoading(true);
      console.log(data.error);
      setError(data.error);
      setMessage(data.message);
      cleanup();
      return;
    }
    if (status === 200) {
      setLoading(true);
      console.log(data);
      setSuccess(true);
      setMessage(data.message);
      return data.data;
    }
  }

  return (
    <Tutor menu={sideBarMenu} footer={sideFooter}>
      <Container className={'md:max-w-6xl  mx-auto w-full p-5 min-h-screen'}>
        <h2 className="text-2xl">Account</h2>

        <section>
          <div className="card">
            <div className="flex space-x-8">
              <div className="w-1/4">
                <Image
                  src="/avatar.png"
                  alt="profile"
                  width={256}
                  height={256}
                />
              </div>
              <div className="w-3/4 mt-8">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="flex space-x-2 items-center">
                      <h2 className="text-2xl">Abiola Fasanya</h2>
                      {user?.emailVerified ? (
                        <MdVerified className="text-blue-500" />
                      ) : (
                        <MdPending className="text-orange-500" />
                      )}
                    </div>
                    <h5 className="text-base">Student Id: {user?.id}</h5>
                  </div>
                  <button className="btn">Edit Profile</button>
                </div>

                <div className="mt-14">
                  <h3 className="text-xl mb-4">Personal Information</h3>
                  <div className="flex justify-between">
                    <div className="">
                      <h5 className="text-md font-semibold">Name</h5>
                      <h3 className="text-base">{user?.name}</h3>
                    </div>
                    <div className="">
                      <h5 className="text-md font-semibold">Email</h5>
                      <h3 className="text-base">{user?.email}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white mt-8 p-5 shadow-sm rounded border">
          {error && <AlertMsg type="alert-error" message={message} />}
          {success && <AlertMsg type="alert-success" message={message} />}
          <form onSubmit={updateAccount} className="">
            <div className="flex justify-between">
              <div className="form-group w-1/2">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  className="form-control "
                  defaultValue={user?.name as string}
                />
              </div>
              <div className="form-group w-1/2">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control "
                  defaultValue={user?.username as string}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="form-group w-1/2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control "
                  disabled
                  defaultValue={user?.email as string}
                />
              </div>
              <div className="form-group w-1/2">
                <label htmlFor="email">Image</label>
                <input
                  type="file"
                  id="Image"
                  className="form-control "
                  defaultValue={user?.image as string}
                />
              </div>
            </div>
            <div className="form-group flex">
              <button className="btn py-3 ml-auto">Update</button>
            </div>
          </form>
        </section>
      </Container>
    </Tutor>
  );
};

export default account;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id as string },
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(user)),
    },
  };
};
