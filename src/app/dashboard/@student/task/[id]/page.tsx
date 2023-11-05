import Breadcrumbs from '@/components/shared/breadcrumb/Breadcrumbs';
import { db } from '@/lib/db';

async function getTask(id: string) {
  const tasks = await db.task.findMany({ where: { trackId: id } });
  return tasks;
}

const TaskDetail = async ({ params }: { params: { id: string } }) => {
  const tasks = await getTask(params.id);
  console.log(tasks);
  return (
    <div>
      <section className="mt-20 flex flex-col cursor-pointer">
        <h2 className="text-xl font-semibold">Task</h2>
        <Breadcrumbs />
      </section>
    </div>
  );
};

export default TaskDetail;
