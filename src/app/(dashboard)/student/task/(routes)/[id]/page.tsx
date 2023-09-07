import BackNavigation from "@/app/(dashboard)/component/back";

const TaskDetail = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <section className="mt-20 flex flex-col cursor-pointer">
        <h2 className="text-xl font-semibold">Task</h2>
        <BackNavigation
          url="/student/task"
          children={<span>task/{params.id}</span>}
        />
      </section>
    </div>
  );
};

export default TaskDetail;
