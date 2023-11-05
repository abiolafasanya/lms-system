import { db } from '@/lib/db';
import TaskTable from '../components/table';
import axios from 'axios';
import { Task } from '@prisma/client';

interface I_Task extends Task {
  user: {
    name: string | null;
  } | null;
  graded: {
    graded: boolean;
  } | null;
}

async function getTasks() {
  const tasks = await db.task.findMany({});
  return tasks;
}

const Tasks = async () => {
  const tasks = await getTasks();
  return (
    <div>
      <section className="mt-20 flex flex-col cursor-pointer gap-10">
        <h2 className="text-xl font-semibold">Task</h2>
        <TaskTable tasks={tasks} />
      </section>
    </div>
  );
};

export default Tasks;
