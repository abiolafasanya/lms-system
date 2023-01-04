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
      }, 300);
    }
  }, []);

  const [email, setEmail] = useState('');
  const [OAuthEmail, setOAuthEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  // Credentials Login
  async function credentialsLogin(e: React.SyntheticEvent) {
    e.preventDefault();

    let req = signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: `/dashboard?callbackUrl=${asPath}`,
    });

    let data = await req;
    if (data?.error) {
      setError(true);
      setSuccess(false);
      setIsAuth(false);
      setMessage(data.error);
      setTimeout(() => {
        setError(false);
        setMessage('');
      }, 5000);
      console.log(data);
    }
    console.log(data)
     if(data?.ok === true && data?.status === 200) {
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
      }, 5000);
    }
  }

  // Email without password login
  const OAuthMailHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let result;
    console.log(OAuthEmail);
    setTimeout(async () => {
      result = await signIn('email', { email: OAuthEmail });
    }, 3000);
  };

  // Social OAuth Handler
  const OAuthSignin = (provider: any) => () => signIn(provider);

  return (
    <div className="container">
      <div className="card max-w-md mx-auto p-5 md:my-8">
        <h1 className="text-2xl text-center mb-4">Login</h1>
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
                  id="password"
                  className="form-control"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div className="form-group">
                <div className="flex justify-between items-center">
                  <button className="btn">Submit</button>
                  <Link href="/auth/register">
                    Not Registered?{' '}
                    <span className="text-blue-500">Signup</span>
                  </Link>
                </div>
              </div>
            </form>

            <form onSubmit={OAuthMailHandler}>
              <h2 className="text-lg text-center">SignIn with Email</h2>
              <div className="form-group">
                <label htmlFor="OEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="OEmail"
                  className="form-control"
                  value={OAuthEmail}
                  onChange={(e) => setOAuthEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn bg-gray-500 hover:bg-gray-600">
                  SignIn with Email
                </button>
              </div>
            </form>
            <div className="">
              <h2 className="text-center mb-4">Sign in with Socials</h2>
              <div className="flex justify-center space-x-8 items-center">
                {socialProvider.map((social, index) => (
                  <div key={index}>
                    <button
                      className="rounded-full px-5 py-2 border"
                      onClick={OAuthSignin(social.provider)}
                    >
                      {
                        <div className="flex space-x-2 items-center">
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
