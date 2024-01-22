import { useRef, useState } from "react";
import StartMenu from "./StartMenu";
import { UserData, Values } from "@/Types";
import SystemTray from "./SystemTray";
import StartButton from "./StartButton";

interface TaskBarProps {
  changeState: (state: string, userData: UserData) => void;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
  setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
}

const Taskbar: React.FC<TaskBarProps> = ({
  changeState,
  setValues,
  setShutdown,
  username,
}) => {
  const startButtonRef = useRef<HTMLDivElement>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const [startMenuVisible, setStartMenuVisible] = useState(false);

  return (
    <>
      <StartMenu
        changeState={changeState}
        startMenuRef={startMenuRef}
        setStartMenuVisible={setStartMenuVisible}
        setValues={setValues}
        setShutdown={setShutdown}
        username={username}
        startMenuVisible={startMenuVisible}
        startButtonRef={startButtonRef}
      />
      <div className="bg-greyTaskBar fixed bottom-0 left-0 right-0 flex h-9 items-center justify-between px-1 border border-t-white">
        <StartButton
          startMenuVisible={startMenuVisible}
          setStartMenuVisible={setStartMenuVisible}
          startButtonRef={startButtonRef}
        />
        <SystemTray />
      </div>
    </>
  );
};

export default Taskbar;
