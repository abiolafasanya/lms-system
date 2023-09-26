import { db } from "@/lib/db";
import Submissions from "./components/submissions";
import BackNavigation from "@/app/(dashboard)/component/back";
const TaskSubmissions = async ({ params }: { params: { id: string } }) => {
  const submissions = await db.submission.findMany({
    where: {
      taskId: params.id,
    },
    include: {
      grade: {
        select: {
          id: true,
          feedback: true,
          graded: true,
          score: true,
        },
      },
      user: { select: { name: true, id: true } },
      task: { select: { id: true, title: true, point: true } },
    },
  });
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Submissions</h2>
      </section>
      <BackNavigation url="/tutor/task" children={<span>task - {params.id}</span>}/>
      <Submissions submissions={submissions} />
    </div>
  );
};

export default TaskSubmissions;
