import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AlertMsg as Alert } from '@utility/Alert';
import socialProvider from 'data/provider';
import { useSession, signIn, getCsrfToken } from 'next-auth/react';
import { GetServerSideProps, NextPage } from 'next';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
};

type IProps = { csrfToken: string };

const Login: NextPage<IProps> = ({ csrfToken }) => {
  const { auth, setAuth } = useAuth();
  let { push, asPath } = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
    if (status !== 'unauthenticated') {
      setTimeout(() => {
        push('/dashboard');
      }, 50);
    }
  }, []);

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  // Credentials Login
  async function credentialsLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value as string;
    const password = target.password.value as string;

    if (email === '' || password === '') {
      setError(true);
      setMessage('Please fill all fields');
      return;
    }
    let req = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: `/dashboard?callbackUrl=${asPath}`,
    });

    let data = req;
    if (data?.error) {
      setError(true);
      setIsAuth(false);
      target.email.value = '';
      target.password.value = '';
      setMessage(data.error);
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      return;
    }
    if (data !== null) {
      target.email.value = '';
      target.password.value = '';
      setSuccess(true);
      setMessage('Logged in successfully');
      setIsAuth(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        setAuth({
          data,
          session: session,
          status: 'authenticated',
          ok: data?.ok,
        });
        setIsAuth(data?.ok as boolean);
        push('/dashboard');
      }, 1000);
    }
  }

  // Email without password login
  const OAuthMailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target &  {
      OEmail: {value: string}
    };
    setTimeout(async () => {
      await signIn('email', { email: target.OEmail.value });
    }, 3000);
  };

  // Social OAuth Handler
  const OAuthSignin = (provider: any) => () => signIn(provider);

  return (
    <div className="font-montserrat">
      <div className="card max-w-md mx-auto p-5 md:my-8">
        <h1 className="text-xl font-bold text-center mb-4">Login</h1>
        {/* Alert Messages */}
        {error && <Alert type="alert-error" message={message} />}
        {success && <Alert type="alert-success" message={message} />}
        {isAuth && <Alert type="alert-info" message="You are signed" />}
        {auth.status !== 'authenticated' && (
          <>
            <form onSubmit={credentialsLogin}>
              <input
                type="hidden"
                name="csrfToken"
                id="csrfToken"
                defaultValue={csrfToken}
              />
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
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
                  id="password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <div className="flex font-semibold flex-wrap justify-between items-center">
                  <button className="btn">Submit</button>
                  <Link href="/auth/register">
                    <span className="text-blue-500">Signup</span>
                  </Link>
                </div>
              </div>
            </form>

            <form onSubmit={OAuthMailHandler} className="mt-12">
              <h2 className="font-semibold text-xl md:text-lg text-center">
                SignIn with Email
              </h2>
              <div className="form-group">
                <label htmlFor="OEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="OEmail"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button className="flex w-full btn  justify-center font-semibold py-3 md:text-normal bg-gray-500 hover:bg-gray-600">
                  SignIn with Email
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="flex justify-center space-x-8 items-center">
                {socialProvider.map((social, index) => (
                  <div key={index}>
                    <button
                      className="rounded-full px-2 border"
                      onClick={OAuthSignin(social.provider)}
                    >
                      {
                        <div className="flex flex-wrap p-2 md:text-normal space-x-2 items-center">
                          <span>
                            <social.icon className={social.style} />
                          </span>
                          <span>{social.provider}</span>
                        </div>
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
