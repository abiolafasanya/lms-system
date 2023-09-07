import TaskTable from "../components/table";

const Tasks = () => {
  return (
    <div>
      <section className="mt-20 flex flex-col cursor-pointer gap-10">
        <h2 className="text-xl font-semibold">Task</h2>
        <TaskTable />
      </section>
    </div>
  );
};

export default Tasks;
