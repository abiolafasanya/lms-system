"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuestionForm from "./question-form";

const CreateQuestionForm = ({toggle}: {toggle: () => void}) => {
  return (
    <Card className="mt-20 dark:bg-special-600">
      <CardHeader>
        <CardContent>
          <CardTitle>Add Question</CardTitle>
        </CardContent>
        <CardContent>
          <CardDescription>
            <QuestionForm toggle={toggle} />
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateQuestionForm;
