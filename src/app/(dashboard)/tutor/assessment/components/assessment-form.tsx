"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import useAssessment, { FormSchemaType } from "../hooks/useAssessment";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";

import { useState } from "react";
import AlertMessage from "@/app/(dashboard)/component/alert";

const AssessmentForm = () => {
  const { form } = useAssessment();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: FormSchemaType) {
    setMessage("");
    setSuccess(false);
    setError(false);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      const { status, data } = await axios.post("/api/assessment", values);
      if (status === 200 || status === 201) {
        setMessage(data?.message || "Success!");
        setSuccess(true);
        setError(false);
        form.reset()
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
      {message && (
        <AlertMessage error={error} success={success} message={message} />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="dark:bg-special-500 border"
                  {...field}
                  disabled={isLoading}
                />
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
                <Textarea
                  className="dark:bg-special-500 border"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-5">
          <Button disabled={isLoading}>Create</Button>
        </div>
      </form>
    </Form>
  );
};

export default AssessmentForm;
