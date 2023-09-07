import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatter";
import { Fragment } from "react";
import useAssessment from "../hooks/useAssessment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash } from "lucide-react";

const AssessmentTable = () => {
  const { assessements, fetchAssessment, isLoading, handleDelete } =
    useAssessment();
  return (
    <Fragment>
      {Array.isArray(assessements) && assessements.length > 0 ? (
        <section className="mt-20 rounded-md flex">
          <Table className="dark:bg-special-600">
            <TableCaption>Assessments List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description 1</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessements.map((assessment, i) => (
                <TableRow key={i * Date.now()} className="capitalize">
                  <TableCell className="text-ellipsis">
                    {assessment.title}
                  </TableCell>
                  <TableCell className="truncate max-w-sm">
                    {assessment.description}
                  </TableCell>
                  <TableCell className="text-ellipsis">
                    {formatDate(assessment.createdAt as unknown as string)}
                  </TableCell>
                  <TableCell className="text-ellipsis flex gap-2">
                    <Link href={`/tutor/assessment/${assessment.id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                    <Button onClick={() => handleDelete(assessment.id)}>
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <p>{isLoading ? "loading..." : "No assessement has been created!"}</p>
      )}
    </Fragment>
  );
};

export default AssessmentTable;
