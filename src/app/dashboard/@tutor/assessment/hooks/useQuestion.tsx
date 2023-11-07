'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Question } from '@prisma/client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  question: z.string().nonempty().min(5),
  answer: z.string().min(1),
  option1: z.string().min(1),
  option2: z.string().min(1),
  option3: z.string().min(1),
  option4: z.string().min(1),
});

interface Response {
  data: {
    question: Question;
    message: string;
  };
}

export type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  question: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  answer: '',
};

export function useQuestion() {
  const params = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({
    message: '',
    error: false,
    sucess: false,
    isLoading: false,
    isSubmitting: false,
  });
  const queryClient = useQueryClient();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { toast } = useToast();
  const get = useQuery({
    queryKey: ['assessmentQuestionData'],
    queryFn: async () => {
      const { data } = await axios.get<Question[]>(`/api/assessment/${params.id}`);
      setQuestions(data);
      return data;
    },
  });

  const post = useMutation({
    mutationFn: async (values: FormSchemaType) => {
      const { data } = await axios.post<FormSchemaType, Response>(`/api/assessment/${params.id}`, values);
      form.reset();

      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['assessmentQuestionData'] });
      toast({
        title: 'Success',
        description: 'You have successfully added a new question',
      });
    },
    onError(error, variables, context) {
      setMessage(error.message);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/assessment/${params.id}?questionId=${id}`);
      return data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['assessmentQuestionData'] });
      console.log(data);
      console.log(variables);
      console.log(context);
      toast({
        title: 'Question deleted',
        description: 'You have successfully deleted the question',
      });
    },
    onError(error, variables, context) {
      console.log(error);
      console.log(variables);
      console.log(context);

      toast({
        title: 'Error',
        description: 'A problem has occurred while deleting the question',
      });
    },
  });

  return { get, remove, post, form };
}
