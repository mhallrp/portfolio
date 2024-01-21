import { decodeHtmlEntities } from "../../../Model/utils";
import { QuizData } from "../../../Types";

interface QuizQuestionProps {
  quizData: QuizData;
  score: number;
}

const Question: React.FC<QuizQuestionProps> = ({ quizData, score }) => {
  return (
    <div className="flex w-full items-center gap-4">
      <h2 className="text-left font-nunito text-2xl">
        {Array.isArray(quizData.triviaQuestions)
          ? 10 - quizData.triviaQuestions.length + 1
          : 0}
        /10{" "}
        {quizData.triviaQuestions[0] &&
          decodeHtmlEntities(quizData.triviaQuestions[0].question)}
      </h2>
      <p className="ml-auto pt-1 text-base text-greytext">
        Score
        <span className="ml-3 rounded bg-purple px-2 py-1 leading-4 text-white">
          {score}
        </span>
      </p>
    </div>
  );
};

export default Question;
