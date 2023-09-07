import { useEffect, useState } from "react";
import { Assessment, Prisma, Question } from "@prisma/client";

interface AssessmentType extends Assessment {
  questions: Question[];
}

interface SelectedAnswer {
  index: number;
  answer: string;
  isCorrect: boolean;
}

const useAssessment = (assessment: AssessmentType) => {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer[]>([]);
  const [questions, setQuestions] = useState<Question[]>(
    assessment.questions || []
  );

  useEffect(() => {
    setQuestions(assessment.questions || []);
  }, [assessment]);

  const handlePrevious = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const prevQues = currentIndex - 1;
    if (prevQues >= 0) setCurrentIndex(prevQues);
  };

  const handleNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const nextQues = currentIndex + 1;
    if (nextQues < questions.length) setCurrentIndex(nextQues);
  };

  const selectedOption = (option: string, answer: string, index: number) => {
    // const parsedOption = option as { answer: string; isCorrect: boolean } | null;

    setSelectedAnswer((prev) => {
      const updatedAnswers = prev.map((selected) =>
        selected.index === index
          ? { ...selected, answer: option || "", isCorrect: option === answer }
          : selected
      );
      if (!updatedAnswers.some((selected) => selected.index === index)) {
        updatedAnswers.push({
          index,
          answer: option,
          isCorrect: option === answer,
        });
      }
      return updatedAnswers;
    });
  };

  const handleSubmitButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newScore = 0;
    const maxPossibleScore = questions.length;

    newScore = questions.reduce((totalScore, question, index) => {
      const makeOptionArr = [
        question.option1,
        question.option2,
        question.option3,
        question.option4,
      ];
      const correctOption = makeOptionArr.find(
        (option) => option === question.answer
      );

      const selected = selectedAnswer.find((answer) => answer.index === index);

      if (selected && selected.isCorrect && correctOption) {
        return totalScore + 1;
      }

      return totalScore;
    }, 0);

    setScore(newScore);
    setShowScore(true);
    setPercentage(Math.round((newScore / maxPossibleScore) * 100));
  };

  return {
    score,
    showScore,
    currentIndex,
    percentage,
    selectedAnswer,
    questions,
    handlePrevious,
    handleNext,
    selectedOption,
    handleSubmitButton,
  };
};

export default useAssessment;
