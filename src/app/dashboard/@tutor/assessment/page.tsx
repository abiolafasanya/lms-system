'use client';
import { Button } from '@/components/ui/button';
import AssessmentTable from './components/assessment-table';
import { useState } from 'react';
import { Modal } from '@/app/components/modals/Modal';
import AssessmentForm from './components/assessment-form';

const Assessment = () => {
  const [openCreateAssessment, setOpenCreateAssessment] = useState(false);
  const toggleCreateAssessment = () => {
    setOpenCreateAssessment((open) => !open);
  };
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Assessments</h2>
        <Button onClick={toggleCreateAssessment}>Create Assessment</Button>
      </section>
      <Modal isOpen={openCreateAssessment} toggle={toggleCreateAssessment} title="Create New Assessment">
        <AssessmentForm toggle={toggleCreateAssessment} />
      </Modal>
      <AssessmentTable />
    </div>
  );
};

export default Assessment;
