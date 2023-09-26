import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Submission } from "@prisma/client";
import { Fragment } from "react";
import { DataTable } from "./data-table";
import { columns } from "../hooks/useTable";
import { submissionsData } from "@/data/submissionsDemo";
import { SubmissionAttached } from "@/types/submission-attached";

const Submissions = ({
  submissions,
}: {
  submissions: SubmissionAttached[];
}) => {
  const data = submissionsData;
  return (
    <Card className="mt-20">
      <CardHeader>
        <CardTitle>Task Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Fragment>
          {Array.isArray(data) && data.length > 0 ? (
            <DataTable columns={columns} data={submissions} />
          ) : (
            <p>No submissions</p>
          )}
        </Fragment>
      </CardContent>
    </Card>
  );
};

export default Submissions;
