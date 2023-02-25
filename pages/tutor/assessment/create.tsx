import React, { useState, useEffect } from 'react';
import Tutor from '@layout/Tutor';
import { sideBarMenu, sideFooter } from 'data/index';
import Container from 'components/utility/Container';
import Axios from 'helper/axios';
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

type Props = { data: string };

const prisma = new PrismaClient();
const create = (props: any) => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<any[]>([
    { answer: '', isCorrect: false },
  ]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assessment, setAssessment] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(props.assessments);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  async function createAssessment(e: any) {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    const body = { title, description };
    const { data, status } = await Axios.post('/api/assessment/create', body);
    if (data.error) {
      throw new Error(data.error);
    }
    if (status === 400 || status === 401) {
      throw new Error('Bad request check your credentials');
    }
    if (status === 200 || status === 201) {
      console.log(data);
    }
  }

  async function handleQuestion(e: any) {
    e.preventDefault();
    const input = newFunction(e, setQuestion, setOptions);
    const { data, status } = await Axios.post(
      '/api/assessment/question',
      input
    );
    if (status === 200 || status === 201) {
      console.log(data);
    }
    if (status === 404) {
      throw new Error(data.error);
    }
    // console.log(input);
  }
  return (
    <Tutor menu={sideBarMenu} footer={sideFooter}>
      <Container className="mt-14 min-h-screen">
        <h2 className="text-2xl">Assessment</h2>
        <div className="text-gray-500">
          <span>
            <Link href="/assessment">Assessment</Link> &larr; Create
          </span>
        </div>
        <div className="flex justify-between">
          <section className="card mt-4 px-5 h-fit w-full">
            <h1 className="text-2xl">Add Question</h1>
            <form onSubmit={handleQuestion}>
              <div className="form-group">
                <label htmlFor="assessment" className="form-label">
                  Assessment
                </label>

                <select
                  name="assessment"
                  id="assessment"
                  className="form-control"
                >
                  {props.assessments &&
                    props.assessments.map((assessment: any) => (
                      <option value={assessment.id} key={assessment.id}>
                        {assessment.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="question" className="form-label">
                  Question
                </label>
                <textarea
                  rows={3}
                  cols={5}
                  color="blue"
                  aria-placeholder="Question"
                  className="text-area"
                  id="question"
                ></textarea>
              </div>
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
                <button className="btn px-7">Save Question</button>
              </div>
            </form>
          </section>
          <section className="card mt-4 px-5 h-fit w-full">
            <h1 className="text-2xl">Create Assessement</h1>
            <form onSubmit={createAssessment}>
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input type="text" id="title" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="" className="form-label">
                  Description
                </label>
                <input type="text" id="description" className="form-control" />
              </div>
              <div className="form-group">
                <button className="btn">Create Assessment</button>
              </div>
            </form>
          </section>
        </div>
      </Container>
    </Tutor>
  );
};

export default create;
function newFunction(
  e: any,
  setQuestion: React.Dispatch<React.SetStateAction<string>>,
  setOptions: React.Dispatch<React.SetStateAction<any[]>>
) {
  let question, a, b, c, d, answer, assessmentId;
  question = e.target?.question.value;
  a = e.target?.option1.value as string;
  b = e.target?.option2.value as string;
  c = e.target?.option3.value as string;
  d = e.target?.option4.value as string;
  answer = e.target?.answer.value as string;
  assessmentId = e.target?.assessment.value as string;
  let option = [
    { answer: a, isCorrect: a === answer },
    { answer: b, isCorrect: b === answer },
    { answer: c, isCorrect: c === answer },
    { answer: d, isCorrect: d === answer },
  ];
  setQuestion(question);
  setOptions(option);
  const input = { question: question, options: option, answer, assessmentId };
  return input;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const assessments = await prisma.assessment
    .findMany()
    .finally(async () => await prisma.$disconnect());

  return {
    props: {
      assessments: JSON.parse(JSON.stringify(assessments)),
    },
  };
};
