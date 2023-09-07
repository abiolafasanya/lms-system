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
  const [questions, setQuestions] = useState<Question[]>(assessment.questions || []);

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

  const formatQuestion = (option: Prisma.JsonValue[] | unknown): string => {
    const optionToString = option as { answer: string; isCorrect: boolean } | null;
    return optionToString?.answer || "";
  };

  const selectedOption = (option: Prisma.JsonValue[] | unknown, index: number) => {
    const parsedOption = option as { answer: string; isCorrect: boolean } | null;

    setSelectedAnswer((prev) => {
      const updatedAnswers = prev.map((selected) =>
        selected.index === index
          ? { ...selected, answer: parsedOption?.answer || "", isCorrect: parsedOption?.isCorrect || false }
          : selected
      );
      if (!updatedAnswers.some((selected) => selected.index === index)) {
        updatedAnswers.push({
          index,
          answer: parsedOption?.answer || "",
          isCorrect: parsedOption?.isCorrect || false,
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
      const correctOption = question.options.find((option) => {
        const parsedOption = option as { answer: string; isCorrect: boolean } | null;
        return parsedOption?.isCorrect
      });
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
    formatQuestion,
    selectedOption,
    handleSubmitButton,
  };
};

export default useAssessment;







































// import { MouseEventHandler, useEffect, useState } from "react";
// import { Assessment, Prisma, Question } from "@prisma/client";

// interface AssessmentType extends Assessment {
//   questions: Question[];
// }

// const useAssessment = (assessment: AssessmentType) => {
//   const [score, setScore] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [percentage, setPercentage] = useState(0)
//   const[showScore, setShowScore] = useState(false)
//   const [selectedAnswer, setSelectedAnswer] = useState<
//     { index: number; answer: string; isCorrect: boolean }[]
//   >([]);

//   const [questions, setQuestions] = useState<Question[]>(() => {
//     if (assessment.questions) return assessment.questions;
//     return [];
//   });

//   function setAssessmentQuestion() {
//     setQuestions(assessment.questions);
//   }

// //   console.log(selectedAnswer);
//   useEffect(() => {
//     setAssessmentQuestion();
//   }, []);

//   const handlePrevious = (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     const prevQues = currentIndex - 1;
//     prevQues >= 0 && setCurrentIndex(prevQues);
//   };

//   const handleNext = (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     const nextQues = currentIndex + 1;
//     nextQues < questions.length && setCurrentIndex(nextQues);
//   };

//   function formatQuestion(option: Prisma.JsonValue[] | unknown): string {
//     const optionToString = option as unknown as {
//       answer: string;
//       isCorrect: boolean;
//     };
//     return optionToString?.answer || ""; // Return the answer if it exists, otherwise return an empty string
//   }

//   function selectedOption(option: Prisma.JsonValue[] | unknown, index: number) {
//     const parsedOption = option as unknown as {
//       answer: string;
//       isCorrect: boolean;
//     };
//     console.log();
//     if (selectedAnswer[index]?.index === index) {
//       setSelectedAnswer((prev) => {
//         const update = prev.filter((selected) => {
//           if (selected.index === index) {
//             selected.answer = parsedOption.answer;
//             selected.isCorrect = parsedOption.isCorrect;
//           }
//         });
//         return update;
//       });
//       return;
//     }
//     const selection = {
//       index: index,
//       answer: parsedOption.answer,
//       isCorrect: parsedOption.isCorrect,
//     };
//     setSelectedAnswer((prev) => [...prev, selection]);
//     // if (parsedOption.isCorrect) {
//     //   setScore((score) => score + 5);
//     //   setCorrectAnswers((prev) => [parsedOption.answer, ...prev]);
//     // }
//     // console.log(option);
//   }

//   const handleSubmitButton = (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     let newScore = 0;
//     const maxPossibleScore = questions.length * 1;
//     for (let i = 0; i < questions.length; i++) {
//       questions[i].options.map((option) => {
//         const parsedOption = option as unknown as {
//           answer: string;
//           isCorrect: boolean;
//         };
//         if (parsedOption.isCorrect) {
//           parsedOption.isCorrect === selectedAnswer[i]?.isCorrect &&
//             (newScore += 1);
//         }
//       });
//     }
//     setScore(newScore);
//     console.log(newScore)
//     setShowScore(true)
//     setPercentage(Math.round((newScore / maxPossibleScore) * 100))
//   };

//   return {
//     score,
//     showScore,
//     currentIndex,
//     percentage,
//     selectedAnswer,
//     questions,
//     handlePrevious,
//     handleNext,
//     formatQuestion,
//     selectedOption,
//     handleSubmitButton,
//   };
// };

// export default useAssessment;
