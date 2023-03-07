import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { GetServerSideProps } from 'next';
import { PrismaClient, Assessment, Grade } from '@prisma/client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from 'styles/AdminUser.module.css';

interface Iprops  {
  assessment: typeAssessment
}

interface typeAssessment extends Assessment  {
  Grade: Grade[]
}

const prisma = new PrismaClient();
const Asessment = ({assessment}: Iprops) => {
  const { data: session } = useSession();
  

  useEffect(() => {
   console.log(assessment, 'assessment')
    return () => {
    };
  }, []);


  return (
    <Tutor>
      <Container className={`min-h-screen`}>
        <h2 className="text-2xl">Assessment</h2>
        <div className="text-gray-500">
          <span>
            <Link href="/tutor/assessment">Assessment</Link> &larr;{' '}
            {assessment?.id}
          </span>
        </div>
        <section className="mt-14 px-5 lg:w-3/4 mx-auto">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Username</th>
                    <th>Class</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
        </section>
      </Container>
    </Tutor>
  );
};

export default Asessment;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const assessment = await prisma.grade.findFirst({
    where: { assessmentId: id },
  });
  console.log(id)

  return {
    props: {
      assessment: JSON.parse(JSON.stringify(assessment)),
    },
  };
};
