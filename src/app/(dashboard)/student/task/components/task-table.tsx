"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tasks } from "@/data/taskDemo";

const TaskTable = () => {
  return (
    <section className="mt-20 rounded-md flex">
      <Table className="dark:bg-special-600">
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
          {tasks.map((task, i) => (
            <TableRow key={i * Date.now()} className="capitalize">
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.Deadline}</TableCell>
              <TableCell>{task.score}</TableCell>
              <TableCell className="text-emerald-500">{task.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TaskTable;
