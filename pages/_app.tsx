import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from 'context/AuthProvider';
import { ThemeProvider } from 'next-themes';
import { motion } from 'framer-motion';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <AuthProvider>
        <SessionProvider session={session}>
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: { opacity: 0 },
              pageAnimate: { opacity: 1 },
            }}
            key={router.route}
          >
            <Component {...pageProps} />
          </motion.div>
        </SessionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
