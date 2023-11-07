'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TasksTable from './components/task-table';
import { Modal } from '@/app/components/modals/Modal';
import TaskForm from './components/task-form';

const TaskPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const toggle = () => setShowCreateTask((open) => !open);
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Task</h2>
        <Button onClick={toggle}>Create Task</Button>
      </section>
      <Modal isOpen={showCreateTask} toggle={toggle}>
        <TaskForm toggle={toggle} />
      </Modal>
      <TasksTable />
    </div>
  );
};

export default TaskPage;
