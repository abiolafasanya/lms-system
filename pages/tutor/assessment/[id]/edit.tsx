import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import { sideBarMenu, sideFooter } from 'data/index';
import Container from '@utility/Container';
import Axios from 'helper/axios';
import { GetServerSideProps, NextPage } from 'next';
import { Assessment, PrismaClient, Question } from '@prisma/client';
import Link from 'next/link';
import { AlertMsg } from '@utility/Alert';

type Props = { Assessment: Assessment; Questions: Question };

const prisma = new PrismaClient();
const create: NextPage<Props> = ({ Assessment, Questions }) => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<any[]>([
    { answer: '', isCorrect: false },
  ]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assessment, setAssessment] = useState<any>({});
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log({ Assessment, Questions });
    setAssessment(Assessment);
    setQuestions(Questions);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [questions]);

  async function editAssessment(e: any) {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    const body = { title, description };
    console.log(body);
    const { data, status } = await Axios.patch(
      `/api/assessment/${assessment.id}/updateAssessment`,
      body
    );
    if (data.error) {
      setSuccess(false);
      setError(true);
      setMessage(data.error);
      setTimeout(() => {
        setError(false);
        setMessage('');
        throw new Error(data.error);
      }, 3000);
    }
    if (status === 400 || status === 401) {
      setSuccess(false);
      setError(true);
      throw new Error('Bad request check your credentials');
    }
    if (status === 200 || status === 201) {
      setSuccess(true);
      setMessage(data.message);
      setError(false);
      console.log(data);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
      }, 3000);
    }
  }

  async function handleQuestion(e: any, id: any) {
    e.preventDefault();
    const input = newFunction(e, setQuestion, setOptions);
    const { data, status } = await Axios.patch(
      '/api/assessment/' + id + '/update',
      input
    );
    if (status === 200 || status === 201) {
      console.log(data);
      setSuccess(true);
      setError(false);
      setMessage(data.message);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
        setMessage('');
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

  function prevHandler(e: any) {
    e.preventDefault();
    const prevQues = currentQuestion - 1;
    console.log(prevQues);
    prevQues >= 0 && setCurrentQuestion(prevQues);
  }

  function nextHandler(e: any) {
    e.preventDefault();
    const nextQues = currentQuestion + 1;
    console.log(nextQues);
    nextQues < questions.length && setCurrentQuestion(nextQues);
  }

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <Container className="mt-14 min-h-screen">
        <h2 className="text-2xl">Assessment</h2>
        <div className="text-gray-500 flex justify-between items-center">
          <span>
            <Link href="/assessment">Assessment</Link> &larr;{' '}
            {assessment.id as string}
          </span>
          <Link href={`/assessment/${assessment.id}/add`} className="btn">
            Add new Question
          </Link>
        </div>
        {success && <AlertMsg message={message} type="alert-success" />}
        {error && <AlertMsg message={message} type="alert-error" />}
        <div className="flex justify-between">
          {questions.length > 0 && (
            <section className="card mt-4 px-5 h-fit w-full">
              <h1 className="text-2xl">Update Question </h1>
              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-xl text-black/60">
                  Question {currentQuestion + 1} of {questions?.length}
                </h4>
              </div>

              <form
                onSubmit={(e) =>
                  handleQuestion(e, questions[currentQuestion].id as any)
                }
              >
                <div className="form-group">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <textarea
                    rows={3}
                    color="blue"
                    className="text-area"
                    id="question"
                    // inputMode="text"
                    value={questions[currentQuestion]?.question}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-8 items-center">
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Option One
                    </label>
                    <input
                      type="text"
                      id="option1"
                      value={
                        questions[currentQuestion]?.options[0]?.answer as string
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Option Two
                    </label>
                    <input
                      type="text"
                      id="option2"
                      value={
                        questions[currentQuestion]?.options[1]?.answer as string
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Option Three
                    </label>
                    <input
                      type="text"
                      id="option3"
                      value={
                        questions[currentQuestion]?.options[2]?.answer as string
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Option Four
                    </label>
                    <input
                      type="text"
                      id="option4"
                      value={
                        questions[currentQuestion]?.options[3]?.answer as string
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="" className="form-label">
                      Answer
                    </label>
                    <input
                      type="text"
                      id="answer"
                      value={questions[currentQuestion]?.answer as string}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <span className="form-label">&nbsp;</span>
                    <button className="btn px-7">Update</button>
                  </div>
                </div>
                <div className="form-group flex justify-between">
                  <button className="btn" onClick={prevHandler}>
                    Prev
                  </button>
                  <button className="btn" onClick={nextHandler}>
                    Next
                  </button>
                </div>
              </form>
            </section>
          )}
          {questions.length === 0 && (
            <div className="alert-info">
              No question has been added{' '}
              <Link
                className="btn mt-4"
                href={`/assessment/${assessment.id}/add`}
              >
                Add Question
              </Link>
            </div>
          )}
          <section className="card mt-4 px-5 h-fit w-full">
            <h1 className="text-2xl">Update Assessement</h1>
            <form onSubmit={editAssessment}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  defaultValue={assessment.title}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  defaultValue={assessment.description}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <button className="btn">Update</button>
              </div>
            </form>
          </section>
        </div>
      </Container>
    </Dashboard>
  );
};

export default create;
function newFunction(
  e: any,
  setQuestion: React.Dispatch<React.SetStateAction<string>>,
  setOptions: React.Dispatch<React.SetStateAction<any[]>>
) {
  let question, a, b, c, d, answer;
  question = e.target?.question.value as string;
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
  const input = { question: question, options: option, answer };
  return input;
}

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
      Assessment: JSON.parse(JSON.stringify(assessment)),
      Questions: JSON.parse(JSON.stringify(assessment?.Question)),
    },
  };
};
