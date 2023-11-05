'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { FormSchemaType } from '../hooks/useAssessment';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { AlertError } from '@/app/components/alert/Error';
import { AlertSuccess } from '@/app/components/alert/Success';
import { AssessmentProps } from '@/types';

const AssessmentForm = ({
  toggle,
  error,
  isSubmitting,
  form,
  isError,
  isSuccess,
  mutate,
  response,
}: AssessmentProps & { toggle: () => void }) => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const isLoading = form.formState.isSubmitting || isSubmitting;
  async function onSubmit(values: FormSchemaType) {
    setMessage('');
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    mutate(values);
    if (isSuccess) {
      setMessage(response || 'Success!');
      setSuccess(isSuccess);
      form.reset();
    }

    if (error) {
      console.log(error.message);
      setMessage(error.message);
      setSuccess(isSuccess);
    }
  }
  return (
    <Form {...form}>
      {isError ? <AlertError message={message} /> : null}
      {isSuccess ? <AlertSuccess message={response} /> : null}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-5 gap-2">
          <Button variant="outline" type="button" onClick={toggle}>
            Close
          </Button>
          <Button disabled={isLoading}>Create</Button>
        </div>
      </form>
    </Form>
  );
};

export default AssessmentForm;
