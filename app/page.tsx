"use client";
import React, { useState, useEffect } from "react";
import { getSessionStatus } from "@/Model/authOutcalls";
import { Values } from "@/Types";
import TitleBar from "@/Components/TitleBar";
import QuizNotes from "@/Components/Note";
import Quiz from "@/Components/Quiz";
import TaskBar from "@/Components/TaskBar";
import Authentication from "@/Components/Authentication";
import ErrorView from "@/Components/WarningView";

export default function App() {
  const [state, changeState] = useState("login");
  const [values, setValues] = useState<Values[]>([]);
  const [userData, setUserData] = useState({ name: "", score: 0 });
  const [topZ, setTopZ] = useState(51);
  const [shutdown, setShutdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSessionStatus();
      setUserData(response.data);
      response.success && changeState("quiz");
    };
    fetchData();
  }, []);

  useEffect(() => {
    state === "quiz" && setValues([]);
  }, [state]);

  const showLogin = () => {
    setValues([
      {
        id: 0,
        positionX: (window.outerWidth - 528) / 2,
        positionY: (window.outerHeight - 278) / 4,
        type: "login",
        data: { title: "Welcome to portfolio 98", data: "" },
      },
    ]);
  };

  return (
    <div className={`flex h-dvh w-screen overflow-hidden ${shutdown ? "bg-black" : "bg-windoorsGreen"}`}>
      <div className={`flex w-full flex-col items-center overflow-hidden bg-windoorsGreen`}>
        <div className="w-full overflow-hidden">
          {values.map((valueData) => {
            return (
              <TitleBar key={valueData.id} values={valueData} setValues={setValues} zIndex={topZ} updateZIndex={setTopZ} close={true}>
                {valueData.type === "note" ? (
                  <QuizNotes />
                ) : valueData.type === "quiz" ? (
                  <Quiz setUserData={setUserData} setValues={setValues} values={valueData} userData={userData} />
                ) : valueData.type === "error" ? (
                  <ErrorView />
                ) : (
                  <Authentication changeState={changeState} setValues={setValues} />
                )}
              </TitleBar>
            );
          })}
        </div>
        {state === "quiz" && <TaskBar changeState={changeState} setValues={setValues} setShutdown={setShutdown} username={userData.name} />}
      </div>
    </div>
  );
}
