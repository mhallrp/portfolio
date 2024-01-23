import { useRef, useState } from "react";
import StartMenu from "./StartMenu";
import { UserData, Values } from "@/Types";
import SystemTray from "./SystemTray";
import StartButton from "./StartButton";

interface TaskBarProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
  setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUserData:React.Dispatch<React.SetStateAction<UserData>>
}

const Taskbar: React.FC<TaskBarProps> = ({
  setState,
  setValues,
  setShutdown,
  username,
  setUserData,
}) => {
  const startButtonRef = useRef<HTMLDivElement>(null);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const [startMenuVisible, setStartMenuVisible] = useState(false);

  return (
    <>
      <StartMenu
        setState={setState}
        startMenuRef={startMenuRef}
        setStartMenuVisible={setStartMenuVisible}
        setValues={setValues}
        setShutdown={setShutdown}
        username={username}
        startMenuVisible={startMenuVisible}
        startButtonRef={startButtonRef}
        setUserData={setUserData}
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
