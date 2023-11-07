import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Fragment } from 'react';
import { useQuestion } from '../hooks/useQuestion';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

const QuestionTable = () => {
  const { get, remove } = useQuestion();
  console.log(get.data);
  return (
    <Fragment>
      {Array.isArray(get.data) && get.data.length > 0 ? (
        <section className="mt-20 rounded-md flex">
          <Table className="dark:bg-special-600">
            <TableCaption>Question List</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Option 1</TableHead>
                <TableHead>Option 2</TableHead>
                <TableHead>Option 3</TableHead>
                <TableHead>Option 4</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {get.data.map((question, i) => (
                <TableRow key={i * Date.now()} className="capitalize">
                  <TableCell className="truncate max-w-[200px]">{question.question}</TableCell>
                  <TableCell className="text-ellipsis">{question.option1}</TableCell>
                  <TableCell className="text-ellipsis">{question.option2}</TableCell>
                  <TableCell className="text-ellipsis">{question.option3}</TableCell>
                  <TableCell className="text-ellipsis">{question.option4}</TableCell>
                  <TableCell className="text-ellipsis">{question.answer}</TableCell>
                  <TableCell className="text-ellipsis flex space-x-2">
                    <Button variant="outline">
                      <Edit size={16} />
                    </Button>
                    <Button onClick={() => remove.mutate(question.id)}>
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : get.isLoading ? (
        <span>loading...</span>
      ) : get.isError ? (
        <p>An Error occured while fetching data</p>
      ) : (
        <p>No question has been added!</p>
      )}
    </Fragment>
  );
};

export default QuestionTable;
