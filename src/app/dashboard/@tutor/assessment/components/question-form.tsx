'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { FormSchemaType, useQuestion } from '../hooks/useQuestion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AlertError } from '@/app/components/alert/Error';
import { AlertSuccess } from '@/app/components/alert/Success';

const QuestionForm = ({ toggle }: { toggle: () => void }) => {
  const [message, setMessage] = useState('');

  const { form, post } = useQuestion();
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: FormSchemaType) {
    setMessage('');
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    post.mutate(values);
    if (post.isError) {
      setMessage(post.error.message || '');
    }
    if (post.isSuccess) {
      setMessage(post.data?.message || '');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {post.isError ? <AlertError message={message} /> : null}
        {post.isSuccess ? <AlertSuccess message={message} /> : null}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea className="dark:bg-special-500 border" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <FormField
            control={form.control}
            name="option1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 1</FormLabel>
                <FormControl>
                  <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 2</FormLabel>
                <FormControl>
                  <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 3</FormLabel>
                <FormControl>
                  <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="option4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option 4</FormLabel>
                <FormControl>
                  <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-5 gap-2">
          <Button variant="outline" type="button" onClick={toggle} disabled={isLoading}>
            Close
          </Button>
          <Button disabled={isLoading}>Add</Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
