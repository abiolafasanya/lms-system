export const assessmentArray = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the largest mammal on Earth?",
      options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
      answer: "Blue Whale"
    }
  ];
  
export type AssessmentType = typeof assessmentArray[0]
  