'use client';
import BackNavigation from '@/app/dashboard/component/back';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CreateQuestionForm from '../components/create-question';
import QuestionTable from '../components/question-table';
import useQuestion from '../hooks/useQuestion';
import Breadcrumbs from '@/components/shared/breadcrumb/Breadcrumbs';

const AssessmentDetail = ({ params }: { params: { id: string } }) => {
  const { handleUpdateQuestions } = useQuestion();
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const toggleCreateAssessment = () => {
    setOpenAddQuestion((open) => !open);
    handleUpdateQuestions().then(() => {});
  };
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Assessments | Question</h2>
        <Button onClick={toggleCreateAssessment}>Add Question</Button>
      </section>
      <Breadcrumbs />
      {openAddQuestion ? <CreateQuestionForm toggle={toggleCreateAssessment} /> : null}
      <QuestionTable />
    </div>
  );
};

export default AssessmentDetail;
