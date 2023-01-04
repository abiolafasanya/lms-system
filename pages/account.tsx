import React, { useState } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import { sideBarMenu, sideFooter } from 'data/index';
import { GetStaticProps, NextPage } from 'next';

const account: NextPage = () => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={'bg-[#eee] p-5 min-h-screen'}>
        <div className="flex md:flex-row flex-col w-full">
          <section className="max-w-6xl w-full bg-white p-5 mx-auto shadow-sm rounded border">
            <form>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input type="text" className="form-control " />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control " />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control " />
              </div>
              <div className="form-group">
                <label htmlFor="fullname">Role</label>
                <select className="form-control">
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="user">User</option>
                </select>
              </div>
            </form>
          </section>
          <section className="max-w-2xl md:ml-[24px] md:mt-0 mt-3">
            <button className="btn border mb-3 px-5 py-2 w-[250px] bg-gray-500 text-center text-blue-50">
              Add Person
            </button>
            <button className="btn border px-5 py-2 w-[250px] bg-gray-500 text-center text-blue-50">
              Add Person and another
            </button>
          </section>
        </div>
      </Container>
    </Dashboard>
  );
};

export default account;
