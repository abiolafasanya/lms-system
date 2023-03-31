import React, { useEffect, useState} from 'react';
import Tutor from '@layout/Tutor';
import { sideBarMenu, sideFooter } from 'data/index';
import Container from '@utility/Container';
import Axios from 'helper/axios';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient, Assessment, Question } from '@prisma/client';
import Link from 'next/link';
import { AlertMsg } from '@utility/Alert';
import Table, { TableRow } from '@utility/Table';
import { useRouter } from 'next/router';
import styles from 'styles/Assessment.module.css';

interface Iprops {
  data?: any;
  assessment?: Assessment;
  questions: Question[];
}

type infoDoc = {
  error: boolean;
  success: boolean;
  message: string
}

const edit: NextPage<Iprops> = ({ assessment, questions }) => {

  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [status, setStatus] = useState<infoDoc>()

  function setInfo(info: infoDoc) {
    console.log(info)
    setError(info.error)
    setSuccess(info.success)
    setMessage(info.message)

    setTimeout(() => {
      setError(false)
      setSuccess(false)
      setMessage('')
    }, 5000)
  }
  
  return (
    <div className={styles.box}>
      <Tutor>
        <Container className="w-full min-h-screen p-2">
          <header className='mb-5'>
            <h2 className="text-2xl">Assessment</h2>
            <div className="flex flex-wrap items-center justify-between w-full ">
              <span className="text-gray-500">
                <Link href="/tutor/assessment">Assessment</Link> &larr;{' '}
                {assessment?.id}
              </span>
              <Link href={`/tutor/assessment/${assessment?.id}/add`}>
                <button className='btn'>Add Question</button>
              </Link>
            </div>
          </header>
          {success && <AlertMsg message={message} type="alert-success" />}
          {error && <AlertMsg message={message} type="alert-error" />}
          <main>
            <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Question</th>
                  <th>Option 1</th>
                  <th>Option 2</th>
                  <th>Option 3</th>
                  <th>Option 4</th>
                  <th>Answer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <TableRow key={index} index={index} question={question} setInfo={setInfo} />
                ))}
              </tbody>
            </table>
            </div>
          </main>
        </Container>
      </Tutor>
    </div>
  );
};

export default edit;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const id = context.params?.id as string;
  const assessment = await prisma.assessment.findFirst({
    where: { id: id },
    include: {
      questions: true,
    },
  });

  return {
    props: {
      assessment: JSON.parse(JSON.stringify(assessment)),
      questions: JSON.parse(JSON.stringify(assessment?.questions)),
    },
  };
};
