import { QuizData, QuizQuestion, UserData } from "../Types";
import { fetchQuestions, updateScore } from "./dataOutcalls";
import { ShuffleArray } from "./utils";
import { Values } from "../Types";

export const checkAnswer = (
  quizData: QuizData,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setValues: React.Dispatch<React.SetStateAction<Values[]>>,
  valueID: number,
): void => {
  if (quizData.selected !== null) {
    if (quizData.answers[quizData.selected] === quizData.triviaQuestions[0].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setValues((prevValues) => {
      return prevValues.map((item) => {
        if (item.id === valueID && "answers" in item.data && "triviaQuestions" in item.data) {
          const quizData = item.data as QuizData;
          return {
            ...item,
            data: {
              ...quizData,
              correct: quizData.answers.indexOf(quizData.triviaQuestions[0].correct_answer),
            },
          };
        }
        return item;
      });
    });
  }
};

export const handleNextQuestion = (
  triviaQuestions: QuizQuestion[],
  setValues: React.Dispatch<React.SetStateAction<Values[]>>,
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
  userData: UserData,
  selectedCategory: number,
  quizData: QuizData,
  valueID: number,
): void => {
  if (triviaQuestions.length !== 1) {
    const combinedAnswers = [quizData.triviaQuestions[1].correct_answer, ...quizData.triviaQuestions[1].incorrect_answers];
    const shuffledAnswers = ShuffleArray(combinedAnswers);
    setValues((prevValues) => {
      return prevValues.map((item) => {
        if (item.id === valueID && "triviaQuestions" in item.data && "answers" in item.data) {
          const quizData = item.data as QuizData;
          return {
            ...item,
            data: {
              ...quizData,
              triviaQuestions: quizData.triviaQuestions.slice(1),
              answers: shuffledAnswers,
              selected: null,
              correct: null,
            },
          };
        }
        return item;
      });
    });
  } else {
    setValues((prevValues) => {
      return prevValues.map((item) => {
        if (item.id === valueID && "selected" in item.data && "correct" in item.data) {
          const quizData = item.data as QuizData;

          return {
            ...item,
            data: {
              ...quizData,
              selected: null,
              correct: null,
            },
          };
        }
        return item;
      });
    });
    updateScore(userData.score + score, userData.name);
    setUserData({ name: userData.name, score: userData.score + score });
    alert(`Your score is ${score}/10`);
    setQuestions(setValues, selectedCategory, valueID);
    setScore(0);
  }
};

export const setQuestions = async (setValues: React.Dispatch<React.SetStateAction<Values[]>>, selectedCategory: number, currentId: number) => {
  const newTriviaQuestions = await fetchQuestions(selectedCategory);
  const combinedAnswers = [newTriviaQuestions[0].correct_answer, ...newTriviaQuestions[0].incorrect_answers];
  const shuffledAnswers = ShuffleArray(combinedAnswers);
  setValues((prevValues) => {
    return prevValues.map((item) => {
      if (item.id === currentId && "triviaQuestions" in item.data && "answers" in item.data) {
        const quizData = item.data as QuizData;
        return {
          ...item,
          data: {
            ...quizData,
            triviaQuestions: newTriviaQuestions,
            answers: shuffledAnswers,
          },
        };
      }
      return item;
    });
  });
};
