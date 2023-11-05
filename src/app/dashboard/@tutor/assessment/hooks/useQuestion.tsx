'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Question } from '@prisma/client';
import axios from 'axios';
import { useParams } from 'next/navigation';

const formSchema = z.object({
  question: z.string().nonempty().min(5),
  answer: z.string().nonempty(),
  option1: z.string().nonempty(),
  option2: z.string().nonempty(),
  option3: z.string().nonempty(),
  option4: z.string().nonempty(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  answer: '',
};

const useQuestion = () => {
  const params = useParams();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuestions = async () => {
    setIsLoading(true);
    const { status, data } = await axios.get<Question[]>(`/api/assessment/${params.id}`);
    if (status === 200) {
      console.log(data);
      setQuestions(() => data);
    }
    setIsLoading(false);
  };

  const handleUpdateQuestions = async () => await fetchQuestions();

  const handleDelete = async (id: string) => {
    const { data, status } = await axios.delete(`/api/assessment/${params.id}?questionId=${id}`);
    if (status === 200) {
      await fetchQuestions();
    }
  };

  return { form, isLoading, handleUpdateQuestions, questions, handleDelete };
};

export default useQuestion;
