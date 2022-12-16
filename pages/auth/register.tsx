import { useState, useRef, useEffect } from 'react';
import { AlertMsg as Alert } from '@utility/Alert';
import { useRouter } from 'next/router';
import Axios from 'api/axios';
import Link from 'next/link';

const Register = () => {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // regex expressions

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== password2) {
      setPassword('');
      setPassword2('');
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 50);
      setType('error');
      setMessage('Passwords do not match');
      setError(true);
      return;
    }
    let inputs = { username, email, password };
    try {
      const { data, status } = await Axios.post('/api/auth/signup', inputs);

      if (data.error) {
        setError(true);
        setLoading(false);
        setSuccess(false);
        setType('error');
        // setMessage(data.error as string);
        setMessage('Registration failed');
        setPassword('');
        setPassword2('');
        console.log(data.error.messag);
        return;
      }

      if (status === 200 || status === 201) {
        setError(false);
        setSuccess(true);
        setType('success');
        setMessage('Registration was successful');
        setUsername('');
        setEmail('');
        setPassword('');
        setPassword2('');
        console.log(data);
        setTimeout(() => {
          router.push('/auth/login');
        }, 5000);
        return;
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setSuccess(false);
      setType('error');
      setMessage('internal error');
      setPassword('');
      setPassword2('');
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      console.log('focused');
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div className="card max-w-md mx-auto p-5 md:my-4">
          <h1 className="text-2xl text-center">Registration</h1>
          {error && <Alert type="alert-error" message={message} />}
          {success && <Alert type="alert-success" message={message} />}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                ref={inputRef}
                value={username}
                onChange={({ target }) => setUsername(target.value)}
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
                value={email}
                onChange={({ target }) => setEmail(target.value)}
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
                className={`form-control ${error && 'border-b-red-500'}`}
                value={password}
                ref={passwordRef}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                id="password2"
                className="form-control"
                value={password2}
                onChange={({ target }) => setPassword2(target.value)}
              />
            </div>
            <div className="form-group">
              <div className="flex items-center justify-between">
                <button className="btn">Submit</button>
                <Link href="/auth/login">
                  have an account Already?{' '}
                  <span className="text-blue-500">Login</span>
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
