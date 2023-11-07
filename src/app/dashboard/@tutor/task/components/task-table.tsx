import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formatter';
import useTasks from '../hooks/useTasks';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';

const TasksTable = () => {
  const { get, remove } = useTasks();
  return (
    <div>
      {get.isLoading ? <div>Loading...</div> : null}
      {get.isError ? <div>An error was encountered while fetching data...</div> : null}
      {get.isSuccess && get.data.tasks.length > 0 ? (
        <Card className="mt-20">
          <CardContent className="rounded-md flex">
            <Table>
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
                {get.data?.tasks.map((task) => (
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
                      <Button onClick={() => remove.mutate(task.id)}>
                        <Trash size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardContent>
            <CardDescription className="flex items-center"></CardDescription>
          </CardContent>
        </Card>
      ) : (
        <p>No task found</p>
      )}
    </div>
  );
};

export default TasksTable;

// {/* <Card className="mt-20">
//   {get.isLoading ? (
//     'loading...'
//   ) : Array.isArray(get.data?.tasks) && get.data.tasks.length > 0 ? (
//     <CardContent className="rounded-md flex">
//       <Table className="dark:bg-special-600">
//         <TableCaption>Tasks List</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Description 1</TableHead>
//             <TableHead>Deadline</TableHead>
//             <TableHead>Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {get.data?.tasks.map((task) => (
//             <TableRow key={task.id} className="capitalize">
//               <TableCell className="text-ellipsis">{task.title}</TableCell>
//               <TableCell
//                 className="truncate line-clamp-1 max-w-[250px]"
//                 dangerouslySetInnerHTML={{ __html: task.description }}
//               />
//               {/* </TableCell> */}
//               <TableCell className="text-ellipsis">{formatDate(task.deadline as unknown as string)}</TableCell>
//               <TableCell className="text-ellipsis flex gap-2">
//                 <Link href={`/dashboard/task/${task.id}`}>
//                   <Button variant="outline">View</Button>
//                 </Link>
//                 <Button onClick={() => handleDelete(task.id)}>
//                   <Trash size={16} />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </CardContent>
//   ) : (
//     <CardContent>
//       <CardDescription className="flex items-center">
//         {isLoading ? 'loading...' : 'No assessement has been created!'}
//       </CardDescription>
//     </CardContent>
//   )}
// </Card>; */}
