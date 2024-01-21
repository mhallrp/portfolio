"use client";
import { Values, UserData } from "../../Types";
import Quiz from "../Quiz";
import QuizNotes from "../Note/Note";
import Taskbar from "../TaskBar/TaskBar";
import Authentication from "../Authentication";
import Style from "./style.module.css";
import { useState, useEffect } from "react";
import TitleBar from "../TitleBar";

interface DesktopProps {
  initialUserData: UserData;
  initialState: string;
}

const Desktop: React.FC<DesktopProps> = ({ initialUserData, initialState }) => {
  const [state, changeState] = useState(initialState);
  const [shutdown, setShutdown] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [topZ, setTopZ] = useState(51);
  const [values, setValues] = useState<Values[]>([]);

  useEffect(() => {
    if (state !== "login") {
      setValues([]);
    } else {
      setValues([
        {
          id: 0,
          title: "Welcome to WinDoors",
          positionX: (window.outerWidth - 440) / 2,
          positionY: (window.outerHeight - 200) / 4,
          type: "login",
          data: { data: "" },
        },
      ]);
    }
  }, [state]);

  if (!shutdown) {
    return (
      <div
        className={`flex w-full overflow-hidden flex-col items-center bg-windoorsGreen`}
      >
        <div className="w-full">
          {values.map((valueData, index) => {
            return (
              <TitleBar
                key={valueData.id}
                values={valueData}
                setValues={setValues}
                zIndex={topZ}
                updateZIndex={setTopZ}
                close={true}
              >
                {valueData.type === "note" ? (
                  <QuizNotes />
                ) : valueData.type === "quiz" ? (
                  <Quiz
                    setUserData={setUserData}
                    setValues={setValues}
                    values={valueData}
                    userData={userData}
                  />
                ) : (
                  <Authentication changeState={changeState} />
                )}
              </TitleBar>
            );
          })}
        </div>
        {state === "quiz" && (
          <>
            <Taskbar
              changeState={changeState}
              setNotes={setValues}
              setShutdown={setShutdown}
              username={userData.name}
            />
          </>
        )}
      </div>
    );
  }
};

export default Desktop;
