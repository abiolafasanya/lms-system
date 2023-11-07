'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Assessment } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

interface ResponseData {
  data: { message: string; assessment: Assessment };
}

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

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const get = useQuery({
    queryKey: ['AssessmentData'],
    queryFn: async () => {
      const { data } = await axios.get<Assessment[]>('/api/assessment');
      return data;
    },
  });

  const post = useMutation({
    mutationFn: async (values: FormSchemaType) => {
      const { data } = await axios.post<FormSchemaType, ResponseData>('/api/assessment', values);
      form.reset();
      return data;
    },
    onError(error, variables, context) {
      console.log(error.message);
      toast({
        title: 'Error',
        description: 'Assessment was not created',
        variant: 'destructive',
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['AssessmentData'] });
      toast({
        title: 'Success',
        description: 'You have added a new assessment',
      });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/assessment?assessmentId=${id}`);
      return data;
    },
    onError(error, variables, context) {
      console.log(error.message);
      toast({
        title: 'Error',
        description: 'Assessment not deleted',
        variant: 'destructive',
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['AssessmentData'] });
      toast({
        title: 'Assessment deleted',
        description: 'You have successfully deleted the assessment',
      });
    },
  });

  return {
    form,
    get,
    post,
    remove,
  };
};

export default useAssessment;
