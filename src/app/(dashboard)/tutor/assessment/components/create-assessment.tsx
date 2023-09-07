"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssessmentForm from "./assessment-form";

const CreateAssessmentForm = () => {
  return (
    <Card className="mt-20 dark:bg-special-600">
      <CardHeader>
        <CardContent>
          <CardTitle>Create New Assessment</CardTitle>
        </CardContent>
        <CardContent>
          <CardDescription>
            <AssessmentForm />
          </CardDescription>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateAssessmentForm;
