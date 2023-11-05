import { Task } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchTasks().then(() => {});
  }, []);
  const fetchTasks = async () => {
    setIsLoading(true);
    const { status, data } = await axios.get<{ tasks: Task[] }>('/api/task');

    if (status === 200) {
      // console.log(data);
      setTasks(data.tasks);
      setIsLoading(false);
    }
  };

  const handleUpdateTasks = async () => await fetchTasks();
  const handleDelete = async (id: string) => {
    const { data, status } = await axios.delete(`/api/task/${id}`);
    if (status === 200) {
      await fetchTasks();
    }
  };
  return { tasks, fetchTasks, isLoading, handleDelete, handleUpdateTasks };
};

export default useTasks;
