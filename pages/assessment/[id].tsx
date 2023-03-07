import React, { useState, useEffect } from 'react';
import Dashboard from '@layout/Dashboard';
import Container from '@utility/Container';
import ShowResult from '@utility/ShowResult';
import { GetServerSideProps } from 'next';
import { PrismaClient, Assessment, Question } from '@prisma/client';
import Link from 'next/link';
import { useSession } from  'next-auth/react';

interface Iprops  {
  assessment: typeAssessment
}

interface typeAssessment extends Assessment  {
  Question: Question[]
}

const prisma = new PrismaClient();
const Asessment = ({assessment}: Iprops) => {
  const { data: session } = useSession();
  const [questions, setQuestion] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([
    { answerByUser: '' },
  ]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userInfo, setUserInfo] = useState(() => session?.user);

  useEffect(() => {
    const controller = new AbortController();
    let quest = assessment.Question;
    setQuestion(() => quest);
    let su = session?.user;
    setUserInfo(() => su as typeof su);
    return () => {
      controller.abort();
    };
  }, [session]);

  const handlePrevious = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
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
        (answer: any) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  return (
    <Dashboard>
      <Container className={`min-h-screen`}>
        <h2 className="text-2xl">Assessment</h2>
        <div className="text-gray-500">
          <span>
            <Link href="/assessment">Assessment</Link> &larr;{' '}
            {assessment.id}
          </span>
        </div>
        <section className="mt-14 px-5 lg:w-3/4 mx-auto">
          {showScore ? (
            <ShowResult
              score={score}
              questions={questions}
              user={userInfo}
              assessment={assessment}
            />
          ) : (
            <>
              <div className="max-w-6xl bg-white rounded mx-auto mt-12 px-5 py-3 shadow-md">
                <h1 className="text-2xl text-gray-700 text-center font-semibold">
                  {assessment.title}
                </h1>
                <p className="text-base">{assessment.description}</p>
                <div className="flex flex-col items-start w-full">
                  <h4 className="mt-10 text-xl text-black/60">
                    Question {currentQuestion + 1} of {questions.length}
                  </h4>
                  <div className="mt-4 text-2xl text-black">
                    {questions.length > 0 &&
                      questions[currentQuestion].question}
                  </div>
                </div>

                <form>
                  <div className="flex flex-col w-full">
                    {questions.length > 0 &&
                      questions[currentQuestion].options.map(
                        (answer: any, index: any) => (
                          <div
                            key={index}
                            className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-black/5 border-black/10 rounded-xl"
                            onClick={(e: any) =>
                              handleAnswerOption(answer.answer)
                            }
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
                              onChange={(e) =>
                                handleAnswerOption(answer.answer)
                              }
                            />
                            <p className="ml-6 text-gray-900">
                              {answer.answer}
                            </p>
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
      </Container>
    </Dashboard>
  );
};

export default Asessment;

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
      assessment: JSON.parse(JSON.stringify(assessment)),
    },
  };
};
