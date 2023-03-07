import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import Container from '@utility/Container';
import { GetServerSideProps } from 'next';
import { PrismaClient, Assessment, Grade, User } from '@prisma/client';
import Link from 'next/link';
import styles from 'styles/AdminUser.module.css';

interface Iprops  {
  grade: Igrade[];
}

interface Igrade extends Grade  {
  user: User;
}

const prisma = new PrismaClient();
const Asessment = ({grade}: Iprops) => {
  const [grades, setGrades] = useState<Igrade[]>([])
  

  useEffect(() => {
   console.log(grades, 'grade')
   setGrades(() => grade)
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
            Result
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
                  {
                  grades?.length > 0 &&
                  grades?.map((grade, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{grade?.user.username || grade?.user.name}</td>
                      <td>NA</td>
                      <td>{grade.assessmentScore}</td>
                      <td></td>
                    </tr>
                  ))
                  }
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
  const grade = await prisma.grade.findMany({
    where: { assessmentId: id },
    include: {
      user: true
    }
  });

  return {
    props: {
      grade: JSON.parse(JSON.stringify(grade)),
    },
  };
};
