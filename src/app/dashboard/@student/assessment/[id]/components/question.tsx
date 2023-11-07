'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useAssessment from '../hooks/useAssessment';
import { Fragment } from 'react';
import ScoreCard from './score-card';
import { Assessment, Question } from '@prisma/client';

interface AssessmentType extends Assessment {
  questions: Question[];
}

const QuestionPage = ({ assessment }: { assessment: AssessmentType }) => {
  const {
    score,
    currentIndex,
    handleNext,
    handlePrevious,
    percentage,
    questions,
    selectedAnswer,
    selectedOption,
    handleSubmitButton,
    showScore,
  } = useAssessment(assessment);

  return (
    <Card className="max-w-6xl mx-auto mt-10">
      {showScore ? <ScoreCard percentage={percentage} score={score} /> : null}
      {!showScore ? (
        <Fragment>
          <CardHeader>
            <CardTitle className="text-center">{questions[currentIndex]?.question}</CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <span className="rounded-full flex items-center justify-center h-8 w-8 p-1 text-primary-foreground bg-primary">
                {currentIndex + 1}{' '}
              </span>
              <span>of</span>
              <span>{questions.length}</span>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
            <CardDescription
              onClick={() =>
                selectedOption(questions[currentIndex]?.option1, questions[currentIndex]?.answer, currentIndex)
              }
              className={`${styles.option} ${
                selectedAnswer[currentIndex]?.answer == questions[currentIndex]?.option1 ? styles.selected : ''
              }`}
            >
              {questions[currentIndex]?.option1 !== null && questions[currentIndex]?.option1}
            </CardDescription>

            <CardDescription
              onClick={() =>
                selectedOption(questions[currentIndex]?.option2, questions[currentIndex]?.answer, currentIndex)
              }
              className={`${styles.option} ${
                selectedAnswer[currentIndex]?.answer == questions[currentIndex]?.option2 ? styles.selected : ''
              }`}
            >
              {questions[currentIndex]?.option2 !== null && questions[currentIndex]?.option2}
            </CardDescription>

            <CardDescription
              onClick={() =>
                selectedOption(questions[currentIndex]?.option3, questions[currentIndex]?.answer, currentIndex)
              }
              className={`${styles.option} ${
                selectedAnswer[currentIndex]?.answer == questions[currentIndex]?.option3 ? styles.selected : ''
              }`}
            >
              {questions[currentIndex]?.option3 !== null && questions[currentIndex]?.option3}
            </CardDescription>

            <CardDescription
              onClick={() =>
                selectedOption(questions[currentIndex]?.option4, questions[currentIndex]?.answer, currentIndex)
              }
              className={`${styles.option} ${
                selectedAnswer[currentIndex]?.answer == questions[currentIndex]?.option4 ? styles.selected : ''
              }`}
            >
              {questions[currentIndex]?.option4 !== null && questions[currentIndex]?.option4}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end gap-5">
            <Button onClick={handlePrevious}>Prev</Button>

            {currentIndex + 1 !== questions.length ? <Button onClick={handleNext}>Next</Button> : null}
            {currentIndex + 1 === questions.length ? <Button onClick={handleSubmitButton}>Submit</Button> : null}
          </CardFooter>
        </Fragment>
      ) : null}
    </Card>
  );
};

const styles = {
  option:
    'flex items-center py-2 text-base hover:bg-primary hover:text-primary-foreground cursor-pointer border-2 font-semibold border-solid px-5 rounded-full',
  selected: 'bg-primary text-primary-foreground',
};

export default QuestionPage;
