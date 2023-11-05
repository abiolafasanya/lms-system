'use client';

import { ColumnDef } from '@tanstack/react-table';
import { submissionsData } from '@/data/submissionsDemo';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SubmissionAttached } from '@/types/submission-attached';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SubmissionHeader = (typeof submissionsData)[0];

export const columns: ColumnDef<SubmissionAttached>[] = [
  {
    accessorKey: 'name',
    // header: "Name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'attachment',
    header: 'Submission',
  },
  {
    accessorKey: 'taskId',
    header: 'TaskId',
  },
  {
    accessorKey: 'graded',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let status: boolean = row.getValue('graded') as boolean;
      return <Status status={status} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const submission = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(submission.attachment)}>
              Copy submission
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Grade user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const Status = ({ status }: { status: boolean }) => {
  return <div className={`${status ? 'text-emerald-500' : 'text-red-500'}`}>{status ? 'Graded' : 'Pending'}</div>;
};
