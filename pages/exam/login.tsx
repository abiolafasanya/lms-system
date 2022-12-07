import { AlertMsg } from '@utility/Alert';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { MdLaunch } from 'react-icons/md';

const login = () => {
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  async function loginHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    if (userId === '' || password === '') {
      setError(true);
      setSuccess(false);
      setMessage('Please fill in credentials correctly');
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      return;
    }

    setSuccess(true);
    setMessage('Login Successfully');
    setTimeout(() => {
      setSuccess(false);
      setMessage('');
    }, 3000);
    return;
  }

  return (
    <div style={backgroundStyle} className="py-14">
      <div className="">
        <div className="flex card rounded-lg mx-auto max-w-6xl  p-0 bg-opacity-70">
          <div className="bg-gray-900 text-gray-200 w-[40%] p-5">
            {/* <div className="text-2xl bg-[url(/logo.png)] bg-cover bg-center mx-auto p-2 bg-no-repeat rounded-full w-[128px] h-[128px]"></div> */}
            <div className="rounded-full p-5 border border-gray-600 w-[128px] mx-auto">
              <Image src="/exam.png" alt="Exam" width={128} height={128} />
            </div>
            <div className="text-2xl text-center">Examination Portal</div>
            {success && <AlertMsg type="alert-success" message={message} />}
            {error && <AlertMsg type="alert-error" message={message} />}
            <form onSubmit={loginHandler}>
              <div className="form-group">
                <label htmlFor="userId" className="form-label">
                  Login ID
                </label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  className="form-control"
                  onChange={({ target }) => setUserID(target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordShow ? 'text' : 'password'}
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                  <span onClick={() => setPasswordShow(!passwordShow)}>
                    {passwordShow ? (
                      <BsEyeSlash className="cursor-pointer absolute top-4 text-gray-800 right-2" />
                    ) : (
                      <BsEye className="cursor-pointer absolute top-4 text-gray-800 right-2" />
                    )}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <button className="btn bg-gray-500 hover:bg-gray-600 px-5 py-3">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="w-[60%]">
            <div className="card-img w-full">
              <Image
                src="/test.png"
                width={500}
                height={500}
                className="mx-auto"
                alt="some-image"
                draggable
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const backgroundStyle = {
  backgroundImage: `url('/exam.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
};

export default login;
