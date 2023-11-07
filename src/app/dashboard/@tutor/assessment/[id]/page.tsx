'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import QuestionTable from '../components/question-table';
import Breadcrumbs from '@/components/shared/breadcrumb/Breadcrumbs';
import { Modal } from '@/app/components/modals/Modal';
import QuestionForm from '../components/question-form';

const AssessmentDetail = ({ params }: { params: { id: string } }) => {
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const toggleCreateAssessment = () => {
    setOpenAddQuestion((open) => !open);
  };
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Assessments | Question</h2>
        <Button onClick={toggleCreateAssessment}>Add Question</Button>
      </section>
      <Breadcrumbs />
      <Modal isOpen={openAddQuestion} toggle={toggleCreateAssessment} title="Add New Question">
        <QuestionForm toggle={toggleCreateAssessment} />
      </Modal>
      <QuestionTable />
    </div>
  );
};

export default AssessmentDetail;
