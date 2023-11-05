'use client';
import { Button } from '@/components/ui/button';
import AssessmentTable from './components/assessment-table';
import { useState } from 'react';
import { Modal } from '@/app/components/modals/Modal';
import AssessmentForm from './components/assessment-form';
import useAssessment from './hooks/useAssessment';

const Assessment = () => {
  const [openCreateAssessment, setOpenCreateAssessment] = useState(false);
  const toggleCreateAssessment = () => {
    setOpenCreateAssessment((open) => !open);
  };
  const {
    form,
    mutate,
    isLoading,
    isSubmitting,
    isPending,
    isSuccess,
    isError,
    error,
    response,
    assessments,
    handleDelete,
  } = useAssessment();
  return (
    <div>
      <section className="mt-20 flex justify-between">
        <h2 className="text-xl font-semibold">Assessments</h2>
        <Button onClick={toggleCreateAssessment}>Create Assessment</Button>
      </section>
      <Modal isOpen={openCreateAssessment} toggle={toggleCreateAssessment} title="Create New Assessment">
        <AssessmentForm
          toggle={toggleCreateAssessment}
          form={form}
          mutate={mutate}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          response={response}
          isSubmitting={isSubmitting}
        />
      </Modal>
      <AssessmentTable
        assessments={assessments}
        isPending={isPending}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Assessment;
