import QuizButtons from "./Buttons/Buttons";
import QuizQuestion from "./Question/QuizQuestion";
import QuizAnswerCard from "./AnswerCard/AnswerCard";
import { decodeHtmlEntities } from "../../Model/utils";
import { QuizData, Values, UserData } from "../../Types";
import Categories from "./Categories";
import QuizCountdown from "./Countdown/Countdown";
import React, { useEffect, useState } from "react";
import { setQuestions } from "../../Model/QuizLogic";

export interface QuizProps {
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
  userData: UserData;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
}

const Quiz: React.FC<QuizProps> = ({ setUserData, userData, values, setValues }) => {
  const [startCountdown, setStartCountdown] = useState(false);
  const [startTimer, setStartTimer] = useState(3);
  const [countdownKey, setCountdownKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [score, setScore] = useState(0);
  const quizData = values.data as QuizData;

  useEffect(() => {
    if (startTimer > 0) {
      const timer = setTimeout(() => {
        setStartTimer(startTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setStartCountdown(true);
    }
  }, [startTimer]);

  const resetCountdown = () => {
    setCountdownKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setQuestions(setValues, selectedCategory, values.id);
  }, [selectedCategory]);

  return (
    quizData.triviaQuestions.length > 0 && (
      <div className="relative flex min-w-0 max-w-5xl flex-col items-center justify-center  border ">
        <div className={`z100 white fixed bg-white px-16 py-12 ${startTimer === 0 && "opacity-0"}`}>
          <h1 className="text-4xl ">{startTimer}</h1>
        </div>
        <Categories setSelectedCategory={setSelectedCategory} setScore={setScore} />
        <QuizCountdown duration={10} key={countdownKey} startCountdown={startCountdown} />
        <div className={`flex flex-col items-center border-b bg-white px-6 pb-6 pt-4`}>
          <QuizQuestion quizData={quizData} score={score} />
          <div className="mt-5 flex w-full flex-col flex-nowrap content-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            {quizData.answers.map((e, index) => (
              <QuizAnswerCard
                selected={quizData.selected == index ? true : false}
                correct={quizData.correct == index ? true : false}
                answer={quizData.correct}
                key={index}
                text={decodeHtmlEntities(e)}
                setSelected={() => {
                  setValues((prevValues) => {
                    return prevValues.map((item) => {
                      if (item.id === values.id && "correct" in item.data) {
                        const quizData = item.data as QuizData;
                        const updatedData = {
                          ...quizData,
                          selected: quizData.correct == null && quizData.selected != index ? index : null,
                        };
                        return {
                          ...item,
                          data: updatedData,
                        };
                      }
                      return item;
                    });
                  });
                }}
              />
            ))}
          </div>
          <QuizButtons
            quizData={quizData}
            setScore={setScore}
            setValues={setValues}
            score={score}
            setUserData={setUserData}
            userData={userData}
            selectedCategory={selectedCategory}
            resetCountdown={resetCountdown}
            valueID={values.id}
          />
        </div>
      </div>
    )
  );
};

export default Quiz;
