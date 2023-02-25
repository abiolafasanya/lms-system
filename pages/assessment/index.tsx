import React, { useEffect, useState } from 'react';
import Dashboard from '@layout/Dashboard';
import { sideBarMenu, sideFooter } from 'data/index';
import { GetServerSideProps } from 'next';
import { PrismaClient, Assessment } from '@prisma/client';
import Container from '@utility/Container';
import Link from 'next/link';
import { AlertMsg } from '@utility/Alert';
import { useRouter } from 'next/router';

type Iprops = {
  assessments: Assessment[];
};
const prisma = new PrismaClient();

const Assessment = (props: Iprops) => {
  const [assessments, setAssessment] = useState<any[]>([]);
  const [isAccessment, setIsAccessment] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    setAssessment(props.assessments);
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className={`min-h-screen px-5 mx-auto`}>
        {success && <AlertMsg message={message} type="alert-success" />}
        {error && <AlertMsg message={message} type="alert-error" />}
        <h1 className="text-2xl ml-2">Assessment</h1>
        <section className="flex flex-col w-full">
            {assessments.length > 0 ? (
              assessments.map((item: any) => (
                <div className="card" key={item.id}>
                  <h1 className="text-xl">{item.title}</h1>
                  <div className="flex justify-between items-center">
                    <p className="text-base">{item.description}</p>
                    <div className="flex space-x-2">
                      <Link
                        href={`/assessment/${item.id}`}
                        className="bg-blue-500 p-2 rounded-sm text-white hover:text-blue-100"
                      >
                        Start 
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card">No Assessment</div>
            )}
        </section>
      </Container>
    </Dashboard>
  );
};

export default Assessment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const assessments = await prisma.assessment
    .findMany()
    .finally(async () => await prisma.$disconnect());

  return {
    props: {
      assessments: JSON.parse(JSON.stringify(assessments)),
    },
  };
};