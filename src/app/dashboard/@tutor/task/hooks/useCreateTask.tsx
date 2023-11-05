import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  description: z.string().nonempty().min(5),
  title: z.string().nonempty(),
  resources: z.array(z.string()),
  deadline: z.string().nonempty(),
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

const useCreateTask = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return { form };
};

export default useCreateTask;
