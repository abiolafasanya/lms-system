'use client';
import { Button } from '@/components/ui/button';
import CreateTask from './components/create-task';
import { useState } from 'react';
import TasksTable from './components/task-table';

const TaskPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const toggle = () => setShowCreateTask((open) => !open);
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Task</h2>
        <Button onClick={toggle}>Create Task</Button>
      </section>
      {showCreateTask ? <CreateTask toggle={toggle} /> : null}
      <TasksTable />
    </div>
  );
};

export default TaskPage;
