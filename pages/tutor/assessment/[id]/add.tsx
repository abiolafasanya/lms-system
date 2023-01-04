import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import { sideBarMenu, sideFooter } from 'data/index';
import Container from '@utility/Container';
import Axios from 'helper/axios';
import { GetServerSideProps, NextPage } from 'next';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { AlertMsg } from '@utility/Alert';
import Table from '@utility/Table';
import { useRouter } from 'next/router';

type Props = { data: string };

const prisma = new PrismaClient();
const header = ['S/N', 'Question', 'Options', 'Answer'];
const create = ({ a, q }: any) => {
  const router = useRouter();
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<any[]>([
    { answer: '', isCorrect: false, assessmentId: '' },
  ]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assessment, setAssessment] = useState<any>(a);
  const [questions, setQuestions] = useState<any[]>(q);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log({ a, q });
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [questions]);

  async function handleQuestion(e: any, id: any) {
    e.preventDefault();
    const input = newFunction(e, id, setQuestion, setOptions);
    const { data, status } = await Axios.patch(
      '/api/assessment/question',
      input
    );
    questionStatus(status, data);
  }

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className="mt-14 min-h-screen">
        <h2 className="text-2xl">Assessment</h2>
        <div className="text-gray-500">
          <span>
            <Link href="/assessment">Assessment</Link> &larr; {assessment.id}
          </span>
        </div>
        {success && <AlertMsg message={message} type="alert-success" />}
        {error && <AlertMsg message={message} type="alert-error" />}
        <div className="flex flex-col justify-between">
          <section className="card mt-4 px-5 h-fit w-full">
            <h1 className="text-2xl">Add Question </h1>
            <div className="flex flex-col items-start w-full"></div>

            <form onSubmit={(e) => handleQuestion(e, assessment.id)}>
              <div className="form-group">
                <label htmlFor="question" className="form-label">
                  Question
                </label>
                <textarea
                  className="text-area"
                  id="question"
                  rows={3}
                  placeholder="Question"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-8 items-center">
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Option One
                  </label>
                  <input type="text" id="option1" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Option Two
                  </label>
                  <input type="text" id="option2" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Option Three
                  </label>
                  <input type="text" id="option3" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Option Four
                  </label>
                  <input type="text" id="option4" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Answer
                  </label>
                  <input type="text" id="answer" className="form-control" />
                </div>
                <div className="form-group">
                  <span className="form-label">&nbsp;</span>
                  <button className="w-full md:btn md:py-3 px-7">Add</button>
                </div>
              </div>
            </form>
          </section>
          <section className="card mt-4 px-5 h-fit w-full">
            <h1 className="text-2xl">Assessement</h1>
            <Table header={header} questions={q} id={assessment.id} />
          </section>
        </div>
      </Container>
    </Dashboard>
  );

  function questionStatus(status: number, data: any) {
    if (status === 200 || status === 201) {
      console.log(data);
      setSuccess(true);
      setError(false);
      setMessage(data.message);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
        setMessage('');
        router.reload();
      }, 3000);
    }
    if (data.error) {
      setSuccess(false);
      setError(true);
      setMessage(data.error);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
        setMessage('');
      }, 3000);
    }
    if (status === 404) {
      setSuccess(false);
      setError(true);
      setMessage(data.error);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
        setMessage('');
        throw new Error(data.error);
      }, 3000);
    }
  }
};

export default create;

function newFunction(
  e: any,
  id: any,
  setQuestion: React.Dispatch<React.SetStateAction<string>>,
  setOptions: React.Dispatch<React.SetStateAction<any[]>>
) {
  let question, a, b, c, d, answer;
  question = e.target?.question.value;
  a = e.target?.option1.value as string;
  b = e.target?.option2.value as string;
  c = e.target?.option3.value as string;
  d = e.target?.option4.value as string;
  answer = e.target?.answer.value as string;
  let option = [
    { answer: a, isCorrect: a === answer },
    { answer: b, isCorrect: b === answer },
    { answer: c, isCorrect: c === answer },
    { answer: d, isCorrect: d === answer },
  ];
  setQuestion(question);
  setOptions(option);
  const input = {
    question: question,
    options: option,
    answer,
    assessmentId: id,
  };
  return input;
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const assessments = await prisma.assessment.findMany();
//   const paths = assessments.map((assessment) => {
//     return {
//       params: { id: assessment.id.toString() },
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const id = context.params?.id as string;
//   const assessment = await prisma.assessment.findFirst({
//     where: { id: id },
//     include: {
//       Question: true,
//     },
//   });

//   return {
//     props: {
//       a: JSON.parse(JSON.stringify(assessment)),
//       q: JSON.parse(JSON.stringify(assessment?.Question)),
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const assessment = await prisma.assessment.findFirst({
    where: { id: id },
    include: {
      Question: true,
    },
  });

  return {
    props: {
      a: JSON.parse(JSON.stringify(assessment)),
      q: JSON.parse(JSON.stringify(assessment?.Question)),
    },
  };
};
