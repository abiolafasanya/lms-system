import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment } from "react";
import useQuestion from "../hooks/useQuestion";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Delete, Edit, Trash } from "lucide-react";

const QuestionTable = () => {
  const { questions, isLoading } = useQuestion();
  return (
    <Fragment>
      {Array.isArray(questions) && questions.length > 0 ? (
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
              {questions.map((question, i) => (
                <TableRow key={i * Date.now()} className="capitalize">
                  <TableCell className="truncate max-w-[200px]">
                    {question.question}
                  </TableCell>
                  <TableCell className="text-ellipsis">
                    {question.option1}
                  </TableCell>
                  <TableCell className="text-ellipsis">
                    {question.option2}
                  </TableCell>
                  <TableCell className="text-ellipsis">
                    {question.option3}
                  </TableCell>
                  <TableCell className="text-ellipsis">
                    {question.option4}
                  </TableCell>
                  <TableCell className="text-ellipsis">
                    {question.answer}
                  </TableCell>
                  <TableCell className="text-ellipsis flex space-x-2">
                    <Button variant="outline">
                      <Edit size={16} />
                    </Button>
                    <Button>
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ) : isLoading ? (
        <span>Loading</span>
      ) : (
        <p>No question has been added!</p>
      )}
    </Fragment>
  );
};

export default QuestionTable;
