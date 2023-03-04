import { useState, useRef, useEffect } from 'react';
import { AlertMsg } from '@utility/Alert';
import { useRouter } from 'next/router';
import Axios from 'helper/axios';
import Link from 'next/link';

interface formType {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string
}

const Register = () => {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
    };
    const email = target.email.value;
    const username = target.username.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;

    const formData : formType = {
      username,
      email,
      password,
      confirmPassword,
    };
    if (password !== confirmPassword) {
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 50);
      setMessage('Passwords do not match');
      setError(true);
      return;
    }
    delete formData.confirmPassword
    // console.log(formData);
    try {
      const { data, status } = await Axios.post('/api/auth/signup', formData);

      if (data.error) {
        setError(true);
        setSuccess(false);
        setMessage('Registration failed');
        console.log(data.error.messag);
        return;
      }

      if (status === 200 || status === 201) {
        setError(false);
        setSuccess(true);
        setMessage('Registration was successful');
        console.log(data);
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
        return;
      }
    } catch (error) {
      setError(true);
      setSuccess(false);
      setMessage('internal error');
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    usernameRef.current?.focus();
    return () => {
      console.clear();
    };
  }, []);

  return (
    <div>
      <div className="font-montserrat">
        <div className="card max-w-md mx-auto p-5 md:my-4">
          <h1 className="text-2xl text-gray-900 font-semibold text-center">Registration</h1>
          {error && <AlertMsg type="alert-error" message={message} />}
          {success && <AlertMsg type="alert-success" message={message} />}
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="name"
                id="username"
                className="form-control"
                ref={usernameRef}
               placeholder={'Enter your unique username'}

              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
               placeholder={'Enter your email'}
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
                placeholder={'Enter your password'}
                className={`form-control ${error && 'border-b-red-500'}`}
                ref={passwordRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                placeholder={'Confirm your password'}
              />
            </div>
            <div className="form-group">
              <div className="flex flex-wrap items-center justify-between">
                <button className="btn font-semibold">Submit</button>
                <Link href="/auth/login">
                  <span className="text-blue-500 font-semibold">Login</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
