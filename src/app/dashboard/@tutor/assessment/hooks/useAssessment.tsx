'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Assessment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  title: '',
  description: '',
};

const useAssessment = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isLoading, data: assessmentData } = useQuery({
    queryKey: ['categoryNameData'],
    queryFn: async () => {
      const { data } = await axios.get<Assessment[]>('/api/assessment');
      setAssessments(data);
      return data;
    },
  });

  const {
    mutate,
    isPending: isSubmitting,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: async (values: FormSchemaType) => {
      const { data } = await axios.post<FormSchemaType, { data: { message: string; assessment: Assessment } }>(
        '/api/assessment',
        values,
      );
      form.reset();
      if (assessmentData) {
        console.log(data.assessment);
        setAssessments([data.assessment, ...assessmentData]);
      }
      return { assessment: data.assessment, message: data.message };
    },
  });

  const { isPending, mutate: handleDelete } = useMutation({
    mutationFn: async (id: string) => {
      const { data, status } = await axios.delete(`/api/assessment?assessmentId=${id}`);
      if (status === 200) {
        toast({
          title: 'Assessment deleted',
          description: 'You have successfully deleted the assessment',
        });
        if (assessmentData) {
          const filterData = assessmentData.filter((data) => data.id !== id);
          setAssessments(filterData);
        }
      } else {
        toast({
          title: 'Assessment not deleted',
          description: 'Process was disrupted',
        });
      }
      return data;
    },
  });

  return {
    form,
    isLoading,
    assessments: assessments ? assessments : (assessmentData as Assessment[]),
    handleDelete,
    error,
    mutate,
    isSuccess,
    response: data?.message as string,
    isError,
    isPending,
    isSubmitting,
  };
};

export default useAssessment;
