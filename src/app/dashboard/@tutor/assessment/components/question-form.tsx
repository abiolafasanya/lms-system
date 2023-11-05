'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import useQuestion, { FormSchemaType } from '../hooks/useQuestion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AlertMessage from '@/app/dashboard/component/alert';
import axios, { AxiosError } from 'axios';
import { useParams } from 'next/navigation';

const QuestionForm = ({ toggle }: { toggle: () => void }) => {
  const params = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { form, handleUpdateQuestions } = useQuestion();
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: FormSchemaType) {
    setMessage('');
    setSuccess(false);
    setError(false);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      const { status, data } = await axios.post(`/api/assessment/${params.id}`, values);
      if (status === 200 || status === 201) {
        setMessage(data?.message || 'Success!');
        await handleUpdateQuestions();
        setSuccess(true);
        setError(false);
        form.reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message || error);
        setSuccess(false);
        setError(true);
        if (error.message) {
          setMessage(error.message);
        }
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {message && <AlertMessage error={error} success={success} message={message} />}
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
/**
 * 
 * <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <FormItem>
                  <FormLabel>Option 1</FormLabel>
                  <FormControl>
                    <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Option 2</FormLabel>
                  <FormControl>
                    <Input className="dark:bg-special-500 border" {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Option 3</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Option 4</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                </FormItem>
              </div>
 */
