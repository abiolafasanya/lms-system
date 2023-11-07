'use client';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formatter';

import { Task } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface I_Task extends Task {
  user: {
    name: string | null;
  } | null;
  graded: {
    graded: boolean;
  } | null;
}

const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  const { push } = useRouter();
  const handleTask = (task: (typeof tasks)[0]) => {
    push(`/student/task/${task.id}`);
  };
  function graded(val: string) {}
  return (
    <Card>
      <Table>
        <TableCaption>React Tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="">Score</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(tasks) &&
            tasks.length > 0 &&
            tasks?.map((task, i) => (
              <TableRow key={task?.id} className="capitalize" onClick={() => handleTask(task)}>
                <TableCell className="font-medium">{task?.title}</TableCell>
                <TableCell>{formatDate(new Date(task?.deadline).toUTCString())}</TableCell>
                <TableCell>0/{task?.point}</TableCell>
                <TableCell className="text-emerald-500">{/* {task?.graded?.graded} */}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TaskTable;
