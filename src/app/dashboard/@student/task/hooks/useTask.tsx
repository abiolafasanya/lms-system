import { Task } from '@prisma/client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  description: z.string().min(3),
  title: z.string().min(1),
  resources: z.array(z.string()),
  deadline: z.string().min(1),
  point: z.number().gt(0, 'Must be greater than 0').nonnegative().int(),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  description: '',
  title: '',
  resources: [],
  deadline: '',
  point: 0,
};

interface ResponseData {
  data: { message: string; task: Task };
}

export function useTasks() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const get = useQuery({
    queryKey: ['student_tasks'],
    queryFn: async () => {
      const { data } = await axios.get<{ tasks: Task[] }>('/api/task');
      return data;
    },
  });

  const post = useMutation({
    mutationFn: async (values: FormSchemaType) => {
      const { data } = await axios.post<FormSchemaType, ResponseData>('/api/task/', values);
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
      queryClient.invalidateQueries({ queryKey: ['student_tasks'] });
      toast({
        title: 'Success',
        description: 'You have added a new assessment',
      });
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete<{
        success: boolean;
        message: string;
      }>(`/api/task`, { params: { taskId: id } });
      return data;
    },
    onError(error, variables, context) {
      console.log(error.message);
      toast({
        title: 'Error',
        description: 'Task not deleted',
        variant: 'destructive',
      });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['student_tasks'] });
      toast({
        title: 'Assessment deleted',
        description: 'You have successfully deleted the assessment',
      });
    },
  });

  return { get, remove, form, post };
}

export default useTasks;
