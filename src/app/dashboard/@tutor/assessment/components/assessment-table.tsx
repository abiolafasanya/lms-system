import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate } from '@/utils/formatter';
import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { AssessmentTable } from '@/types';
import { Assessment } from '@prisma/client';
import useAssessment from '../hooks/useAssessment';

const AssessmentTable = () => {
  const { get, remove } = useAssessment();
  return (
    <Fragment>
      {Array.isArray(get.data) && get.data.length > 0 ? (
        <section className="mt-20 rounded-md flex">
          <Table className="">
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
              {Array.isArray(get.data) &&
                get.data.length > 0 &&
                get.data.map((assessment, i) => (
                  <TableRowData
                    key={i}
                    assessment={assessment}
                    handleDelete={remove.mutate}
                    isPending={remove.isPending}
                  />
                ))}
            </TableBody>
          </Table>
        </section>
      ) : (
        <p>{get.isLoading ? 'loading...' : 'No assessement has been created!'}</p>
      )}
    </Fragment>
  );
};

export default AssessmentTable;

function TableRowData({
  assessment,
  handleDelete,
  isPending,
}: Omit<AssessmentTable, 'assessments' | 'isLoading'> & { assessment: Assessment }) {
  return (
    <TableRow key={assessment.id} className="capitalize">
      <TableCell className="text-ellipsis">{assessment.title}</TableCell>
      <TableCell className="truncate max-w-sm">{assessment.description}</TableCell>
      <TableCell className="text-ellipsis">{formatDate(assessment.createdAt as unknown as string)}</TableCell>
      <TableCell className="text-ellipsis flex gap-2">
        <Link href={`/dashboard/assessment/${assessment.id}`}>
          <Button variant="outline">View</Button>
        </Link>
        <DeleteButton handleDelete={handleDelete} id={assessment.id} isPending={isPending} />
      </TableCell>
    </TableRow>
  );
}

const DeleteButton = ({
  isPending,
  handleDelete,
  id,
}: Pick<AssessmentTable, 'isPending' | 'handleDelete'> & { id: string }) => {
  return (
    <Button disabled={isPending} onClick={() => handleDelete(id)}>
      <Trash size={16} />
    </Button>
  );
};
