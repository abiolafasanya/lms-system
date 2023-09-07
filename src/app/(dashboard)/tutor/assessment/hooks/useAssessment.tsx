"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Assessment } from "@prisma/client";
import axios from "axios";

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  title: "",
  description: "",
};

const useAssessment = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [assessements, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchAssessment().then(() => {});
  }, []);
  const fetchAssessment = async () => {
    setIsLoading(true);
    const { status, data } = await axios.get<Assessment[]>("/api/assessment");
    if (status === 200) {
      console.log(data);
      setAssessments(() => data);
      setIsLoading(false);
    }
  };

  const handleUpdateAssessment = async() => await fetchAssessment();

  const handleDelete = async (id: string) => {
    const { data, status } = await axios.delete(
      `/api/assessment?assessmentId=${id}`
    );
    if (status === 200) {
      await fetchAssessment();
    }
  };

  return {
    form,
    isLoading,
    assessements,
    fetchAssessment,
    handleUpdateAssessment,
    handleDelete,
  };
};

export default useAssessment;
