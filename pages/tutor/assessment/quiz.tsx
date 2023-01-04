import React, { useEffect, useState } from 'react';
import Dashboard from '@layout/Dashboard';
import { sideBarMenu, sideFooter } from 'data/index';
import { GetServerSideProps, NextPage } from 'next';
import styles from 'styles/Assessment.module.css';
// import { assessment as questions } from 'data/assessment';
import { PrismaClient, Question } from '@prisma/client';
import question from 'pages/api/assessment/question';

type quest = {
  question: string;
  options: any[];
  answer: string;
};
type Props = {
  questions: Question[];
  // questions: [{ question: string; options: any[] | string; answer: string }];
};
const prisma = new PrismaClient();

const Assessment: NextPage<Props> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([
    { answerByUser: '' },
  ]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(questions);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [questions]);
  const handlePrevious = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const nextQues = currentQuestion + 1;
    console.log(questions.length);
    nextQues < questions?.length && setCurrentQuestion(nextQues);
  };

  const handleAnswerOption = (answer: any) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  const handleSubmitButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].options.map(
        ({ answer, isCorrect }: any) =>
          isCorrect &&
          answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <Dashboard menu={sideBarMenu} footer={sideFooter}>
      <section className="mt-14 px-5 lg:w-3/4 mx-auto">
        {showScore ? (
          <h1 className="text-3xl h-screen font-semibold text-center text-black">
            You scored {score} out of {questions.length}
          </h1>
        ) : (
          <>
            <div className="max-w-6xl bg-white rounded mx-auto mt-12 px-5 py-3 shadow-md">
              <h1 className="text-2xl text-gray-700 text-center font-semibold">
                Assessment
              </h1>
              <div>Time: 30:10 Mins Remaining</div>

              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-xl text-black/60">
                  Question {currentQuestion + 1} of {questions.length}
                </h4>
                <div className="mt-4 text-2xl text-black">
                  {questions[currentQuestion].question}
                </div>
              </div>

              <form>
                <div className="flex flex-col w-full">
                  {questions[currentQuestion].options.map(
                    (answer: any, index) => (
                      <div
                        key={index}
                        className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-black/5 border-black/10 rounded-xl"
                        onClick={(e: any) => handleAnswerOption(answer?.answer)}
                      >
                        <input
                          type="radio"
                          className="w-6 h-6 bg-black"
                          name={answer.answer}
                          value={answer.answer}
                          checked={
                            answer.answer ===
                            selectedOptions[currentQuestion]?.answerByUser
                          }
                          onChange={(e) => handleAnswerOption(answer.answer)}
                        />
                        <p className="ml-6 text-gray-900">{answer.answer}</p>
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-between w-full mt-4 text-white">
                  <button
                    className="w-[49%] py-3 bg-blue-600 rounded-lg"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    className="w-[49%] py-3 bg-blue-600 rounded-lg"
                    onClick={
                      currentQuestion + 1 === questions.length
                        ? handleSubmitButton
                        : handleNext
                    }
                  >
                    {currentQuestion + 1 === questions.length
                      ? 'Submit'
                      : 'Next'}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </section>
    </Dashboard>
  );
};

export default Assessment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const questions = await prisma.question.findMany();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
};
