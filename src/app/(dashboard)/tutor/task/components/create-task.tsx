import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskForm from "./task-form";

const CreateTask = ({ toggle }: { toggle: () => void }) => {
  return (
    <Card className="mt-20 dark:bg-special-600">
      <CardHeader>
        <CardContent>
          <CardTitle>Create New Task</CardTitle>
        </CardContent>
        <CardContent>
          <TaskForm toggle={toggle} />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateTask;
