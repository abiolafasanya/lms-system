"use client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatter";

import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface I_Task extends Task {
  user: {
    name: string | null;
  } | null;
  graded: {
    graded: boolean;
  } | null;
}

const TaskTable = () => {
  const [tasks, setTasks] = useState<I_Task[]>([]);
  useEffect(() => {
    fetchTasks().then(() => console.log("fectching tasks"));
  }, []);
  const fetchTasks = async () => {
    const { status, data } = await axios.get<I_Task[]>("/api/task");
    setTasks(() => data);
    console.log(status, data);
  };
  const { push } = useRouter();
  const handleTask = (task: (typeof tasks)[0]) => {
    push(`/student/task/${task.id}`);
  };
  return (
    <Card className="dark:bg-special-600">
      <Table className="">
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
          {tasks?.map((task, i) => (
            <TableRow
              key={task.id}
              className="capitalize"
              onClick={() => handleTask(task)}
            >
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                {formatDate(new Date(task.deadline).toUTCString())}
              </TableCell>
              <TableCell>{task.point}</TableCell>
              <TableCell className="text-emerald-500">
                {task?.graded?.graded}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TaskTable;
