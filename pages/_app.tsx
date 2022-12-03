import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from 'context/AuthProvider';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <AuthProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
