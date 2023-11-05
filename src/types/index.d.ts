import { UseFormReturn } from 'react-hook-form';
import { UseMutateFunction } from '@tanstack/react-query';
import { Assessment } from '@prisma/client';
import { AxiosResponse } from 'axios';

export interface AssessmentProps {
  form: UseFormReturn<
    {
      title: string;
      description: string;
    },
    any,
    undefined
  >;
  mutate: UseMutateFunction<
    {
      assessment: {
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
      };
      message: string;
    },
    Error,
    {
      title: string;
      description: string;
    },
    unknown
  >;
  isSuccess: boolean;
  isError: boolean;
  isSubmitting: boolean;
  response: string;
  error: Error | null;
}

export interface AssessmentTable {
  assessments: Assessment[];
  handleDelete: UseMutateFunction<any, Error, string, unknown>;
  isLoading: boolean;
  isPending: boolean;
}
