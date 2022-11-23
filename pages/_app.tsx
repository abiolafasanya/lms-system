import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from 'context/AuthProvider';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AuthProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthProvider>
  );
}

export default MyApp;
