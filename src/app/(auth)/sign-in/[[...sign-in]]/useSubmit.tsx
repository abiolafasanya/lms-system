'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSignIn, AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { OAuthStrategy } from '@clerk/nextjs/server';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function useSubmit() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInWith = async (strategy: OAuthStrategy) => {
    if (!isLoaded) {
      return null;
    }
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setError('');
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log('submitted');
    if (!isLoaded) {
      return null;
    }

    try {
      const result = await signIn?.create({
        identifier: values.email,
        password: values.password,
      });

      if (result && result.status === 'complete') {
        console.log(result);
        if (setActive !== undefined) {
          await setActive({ session: result.createdSessionId });
          router.push('/');
        }
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error('error', err.errors[0].longMessage);
      setError(err.errors[0].longMessage);
    }
  }
  return { form, onSubmit, error, signInWith };
}
