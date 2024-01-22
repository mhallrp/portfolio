import { handleNextQuestion, checkAnswer } from "../../../Model/quizLogic";
import { QuizData, SetStateType, Values, UserData } from "@/Types";

interface QuizButtonProps {
  quizData: QuizData;
  setScore: SetStateType<number>;
  score: number;
  setUserData: SetStateType<UserData>;
  userData: UserData;
  selectedCategory: number;
  resetCountdown: () => void;
  valueID: number;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
}

const Buttons: React.FC<QuizButtonProps> = ({
  quizData,
  setScore,
  score,
  setUserData,
  userData,
  selectedCategory,
  resetCountdown,
  valueID,
  setValues,
}) => {
  return (
    <div className="mt-4 flex flex-wrap content-center justify-center gap-4">
      <button
        className={`${quizData.selected !== null && quizData.correct === null ? "bg-purple" : "bg-greyanswer"} ${
          quizData.selected !== null && quizData.correct === null ? "text-white" : "text-greyanswerb"
        } h-11 rounded  px-6`}
        disabled={quizData.correct != null ? true : quizData.selected != null ? false : true}
        onClick={() => checkAnswer(quizData, setScore, setValues, valueID)}
      >
        Check Answer
      </button>
      <button
        className={`${quizData.correct !== null ? "bg-purple" : "bg-greyanswer"} ${
          quizData.correct !== null ? "text-white" : "text-greyanswerb"
        } h-11 rounded px-6`}
        disabled={quizData.correct != null ? false : true}
        onClick={() => {
          resetCountdown();
          handleNextQuestion(quizData.triviaQuestions, setValues, score, setScore, setUserData, userData, selectedCategory, quizData, valueID);
        }}
      >
        Next Question
      </button>
    </div>
  );
};

export default Buttons;
