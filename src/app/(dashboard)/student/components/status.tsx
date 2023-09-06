import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const defaultData = [
  { id: 1, title: "Stage", count: 3 },
  { id: 2, title: "Task", count: 3 },
  { id: 3, title: "Submission", count: 4 },
  { id: 4, title: "Overall Point", count: 200 },
];

const Status = () => {
  return (
    <div className="flex flex-col justify-center mt-10 lg:mt-20 md:flex-row items-center gap-4">
      {defaultData.map((status) => (
        <Card key={status.id} className="w-64 dark:bg-special-600">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="text-lg font-semibold">{status.title}</CardTitle>
            <CardDescription className="text-lg font-semibold">{status.count}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default Status;
