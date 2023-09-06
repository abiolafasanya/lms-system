"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Assessment, Question } from "@prisma/client";
import useAssessment from "../hooks/useAssessment";
import { Fragment } from "react";

interface AssessmentType extends Assessment {
  questions: Question[];
}

const QuestionPage = ({ assessment }: { assessment: AssessmentType }) => {
  const {
    score,
    currentIndex,
    formatQuestion,
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
    <Card className="max-w-6xl mx-auto mt-10 dark:bg-special-600 border-special-600">
      {showScore ? (
        <Fragment>
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Total Score: {score}</CardDescription>
            <CardDescription>Total Percentage: {percentage}</CardDescription>
          </CardContent>
        </Fragment>
      ) : null}
      {!showScore ? (
        <Fragment>
          <CardHeader>
            <CardTitle className="text-center">
              {questions[currentIndex].question}
            </CardTitle>
            <div className="flex items-center justify-center space-x-2">
              <span className="rounded-full flex items-center justify-center h-8 w-8 p-1 text-primary-foreground bg-primary">
                {currentIndex + 1}{" "}
              </span>
              <span>of</span>
              <span>{questions.length}</span>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
            {questions[currentIndex].options.map((option, i) => (
              <CardDescription
                key={i}
                onClick={() => selectedOption(option, currentIndex)}
                className={`${styles.option} ${
                  selectedAnswer[currentIndex]?.answer == formatQuestion(option)
                    ? styles.selected
                    : ""
                }`}
              >
                {option !== null && formatQuestion(option)}
              </CardDescription>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end gap-5">
            <Button onClick={handlePrevious}>Prev</Button>

            {currentIndex + 1 !== questions.length ? (
              <Button onClick={handleNext}>Next</Button>
            ) : null}
            {currentIndex + 1 === questions.length ? (
              <Button onClick={handleSubmitButton}>Submit</Button>
            ) : null}
          </CardFooter>
        </Fragment>
      ) : null}
    </Card>
  );
};

const styles = {
  option:
    "flex items-center py-2 text-base hover:bg-primary hover:text-primary-foreground dark:hover:bg-specail-800 cursor-pointer dark:bg-special-700 border-special-600 font-semibold border-2 border-solid px-5 rounded-full",
  selected: "bg-primary text-primary-foreground",
};

export default QuestionPage;
