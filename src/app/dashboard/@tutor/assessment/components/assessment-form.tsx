'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import useAssessment, { FormSchemaType } from '../hooks/useAssessment';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { AlertError } from '@/app/components/alert/Error';
import { AlertSuccess } from '@/app/components/alert/Success';

const AssessmentForm = ({ toggle }: { toggle: () => void }) => {
  const { form, post } = useAssessment();
  const [message, setMessage] = useState('');

  const isLoading = form.formState.isSubmitting || post.isPending;
  async function onSubmit(values: FormSchemaType) {
    setMessage('');
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    post.mutate(values);
    if (post.isSuccess) {
      setMessage(post.data?.message || 'Success!');
      form.reset();
    }

    if (post.isError) {
      console.log(post.error.message);
      setMessage(post.error.message);
    }
  }
  return (
    <Form {...form}>
      {post.isError ? <AlertError message={message} /> : null}
      {post.isSuccess ? <AlertSuccess message={message} /> : null}
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
