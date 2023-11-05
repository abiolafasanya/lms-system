import { Fragment } from 'react';
import Status from './components/status';
import { Card } from '@/components/ui/card';
import TaskTable from './components/table';
import ProgressIndicator from './components/progress';

const Dashboard = () => {
  return (
    <Fragment>
      <Status />
      <section className="flex flex-col md:flex-row my-10 gap-10">
        <Card className="w-full md:w-2/5 py-3 px-5 space-y-5">
          <ProgressIndicator />
        </Card>
        <Card className="w-full md:w-3/5 px-5 py-3">
          <h3 className="text-lg font-semibold">Recent Task</h3>
          <TaskTable tasks={[]} />
        </Card>
      </section>
    </Fragment>
  );
};

export default Dashboard;
