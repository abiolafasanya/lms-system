'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSubmit } from './useSubmit';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { OAuthStrategy } from '@clerk/nextjs/server';
import { AlertError } from '@/app/components/alert/Error';

export default function Page() {
  const { isLoaded } = useSignIn();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  function isSignedInHandler() {
    if (isSignedIn) {
      router.push('/');
    }
  }
  useEffect(() => {
    isSignedInHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoaded) {
    return null;
  }
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      {!isLoaded ? (
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-semibold animate-ping">Loading...</h2>
        </div>
      ) : (
        <SignInForm />
      )}
    </div>
  );
}

function SignInForm() {
  const { form, onSubmit, error, signInWith } = useSubmit();
  return (
    <Card className="p-4 max-w-sm w-full">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>to continue to lms-app</CardDescription>
      </CardHeader>
      {error ? <CardContent>{error ? <AlertError message={error} /> : null}</CardContent> : null}
      <CardContent>
        <SignInWithOAuth provider={signInWith} strategy="oauth_google" />
      </CardContent>
      <CardContent>
        <div className="w-full flex items-center justify-center">
          <hr className="w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-500 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            or
          </span>
        </div>
      </CardContent>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              Submit
            </Button>
            <div className="flex text-sm gap-1">
              <span>No account?</span>
              <Link href="/signup" className="hover:underline text-blue-500 ">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SignInWithOAuth({
  provider,
  strategy,
  children,
}: {
  provider: (strategy: OAuthStrategy) => void;
  strategy: OAuthStrategy;
  children?: ReactNode;
}) {
  return (
    <>
      <Button variant="outline" className="w-full flex justify-between group/google" onClick={() => provider(strategy)}>
        {children ? (
          children
        ) : (
          <>
            <FcGoogle className="" size={24} />
            <span>Continue with Google</span>
          </>
        )}
        <ArrowRight size={16} className="text-transparent group-hover/google:text-gray-500" />
      </Button>
    </>
  );
}
