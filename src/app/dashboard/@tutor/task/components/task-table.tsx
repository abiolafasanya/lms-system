import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formatter';
import useTasks from '../hooks/useTasks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';

const TasksTable = () => {
  const { tasks, isLoading, handleDelete } = useTasks();
  console.log(tasks);
  return (
    <Card className="mt-20">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <CardContent className="rounded-md flex">
          <Table className="dark:bg-special-600">
            <TableCaption>Tasks List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description 1</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id} className="capitalize">
                  <TableCell className="text-ellipsis">{task.title}</TableCell>
                  <TableCell
                    className="truncate line-clamp-1 max-w-[250px]"
                    dangerouslySetInnerHTML={{ __html: task.description }}
                  />
                  {/* </TableCell> */}
                  <TableCell className="text-ellipsis">{formatDate(task.deadline as unknown as string)}</TableCell>
                  <TableCell className="text-ellipsis flex gap-2">
                    <Link href={`/dashboard/task/${task.id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                    <Button onClick={() => handleDelete(task.id)}>
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <CardContent>
          <CardDescription className="flex items-center">
            {isLoading ? 'loading...' : 'No assessement has been created!'}
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
};

export default TasksTable;
