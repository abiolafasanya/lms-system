"use client";
import { Button } from "@/components/ui/button";
import AssessmentTable from "./components/assessment-table";
import CreateAssessmentForm from "./components/create-assessment";
import { useState } from "react";
import useAssessment from "./hooks/useAssessment";

const Assessment = () => {
  const { handleUpdateAssessment } = useAssessment();
  const [openCreateAssessment, setOpenCreateAssessment] = useState(false);
  const toggleCreateAssessment = () => {
    setOpenCreateAssessment((open) => !open);
    handleUpdateAssessment().then(() => {});
  };
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Assessments</h2>
        <Button onClick={toggleCreateAssessment}>Create Assessment</Button>
      </section>
      {openCreateAssessment ? <CreateAssessmentForm /> : null}
      <AssessmentTable />
    </div>
  );
};

export default Assessment;
