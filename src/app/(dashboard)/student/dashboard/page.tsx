import { Fragment } from "react";
import Status from "../components/status";
import { Card } from "@/components/ui/card";
import TaskTable from "../components/table";
import ProgressIndicator from "../components/progress";

const Dashboard = () => {
  return (
    <Fragment>
      <Status />
      <section className="flex my-10 gap-10">
        <Card className="w-2/5 py-3 px-5 space-y-5 dark:bg-special-600">
          <ProgressIndicator />
        </Card>
        <Card className="w-3/5 px-5 py-3 dark:bg-special-600">
          <h3 className="text-lg font-semibold">Recent Task</h3>
          <TaskTable />
        </Card>
      </section>
    </Fragment>
  );
};

export default Dashboard;
