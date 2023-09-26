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
import { Switch } from "@/components/ui/switch";

import useCreateTask, { FormSchemaType } from "../hooks/useCreateTask";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
import AlertMessage from "@/app/(dashboard)/component/alert";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useTasks from "../hooks/useTasks";

const TaskForm = ({ toggle }: { toggle: () => void }) => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const { form } = useCreateTask();
  const {handleUpdateTasks} = useTasks()
  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: FormSchemaType) {
    setMessage("");
    setSuccess(false);
    setError(false);
    console.log(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    try {
      const { status, data } = await axios.post(`/api/task/`, values);
      if (status === 200 || status === 201) {
        setMessage(data?.message || "Success!");
        setSuccess(true);
        setError(false);
        form.reset();
        await handleUpdateTasks();
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

  const toggleResourceMode = () => setIsFile((mode) => !mode);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {message && (
          <AlertMessage error={error} success={success} message={message} />
        )}
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
                <div>
                  <ReactQuill
                    {...field}
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resources</FormLabel>
              <FormControl>
                <Fragment>
                  {isFile ? (
                    <Input
                      multiple
                      type="file"
                      className="dark:bg-special-500 border"
                      {...field}
                      disabled={isLoading}
                    />
                  ) : (
                    <Input
                      type="text"
                      className="dark:bg-special-500 border"
                      {...field}
                      disabled={isLoading}
                      onChange={(event) =>
                        field.onChange([event.target.value])
                      }
                    />
                  )}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="file-mode"
                      checked={isFile}
                      onCheckedChange={toggleResourceMode}
                    />
                    <Label htmlFor="file-mode">File Mode</Label>
                  </div>
                </Fragment>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="dark:bg-special-500 border"
                    {...field}
                    onChange={(event) =>
                      field.onChange(parseInt(event.target.value))
                    }
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    className="dark:bg-special-500 border"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-5 gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={toggle}
            disabled={isLoading}
          >
            Close
          </Button>
          <Button disabled={isLoading}>Add</Button>
        </div>
      </form>
    </Form>
  );
};

export default TaskForm;
