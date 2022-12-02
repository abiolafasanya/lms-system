import Link from 'next/link';
import React from 'react';

const AssessmentHeader = (props: any) => {
  return (
    <div>
      <h2 className="text-2xl">Assessment</h2>
      <div className="text-gray-500">
        <span>
          <Link href="/assessment">Assessment</Link> &larr;{' '}
          {props.assessment.id}
        </span>
      </div>
    </div>
  );
};

export default AssessmentHeader;
