import { Submission } from '@prisma/client';

export interface SubmissionAttached extends Submission {
  user: {
    id: string;
    name: string | null;
  } | null;
  task: {
    id: string;
    title: string;
    point: number;
  } | null;
  grade: {
    id: string;
    graded: boolean;
    score: number;
    feedback: string | null;
  } | null;
}
