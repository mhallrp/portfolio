import Shutdown from "../../assets/shutdown.png";
import Notepad from "../../assets/notepad.png";
import LogoutIcon from "../../assets/logoutIcon.png";
import { useState, useEffect } from "react";
import { Logout } from "../../Model/authOutcalls";
import { Values, UserData } from "../../Types";
import FolderIcon from "../../assets/folderIcon.png";
import { AddNewWindow } from "@/Model/WindowLogic";

export interface StartMenuProps {
  changeState: (state: string, userData: UserData) => void;
  startMenuRef: React.RefObject<HTMLDivElement>;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
  setStartMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  startMenuVisible: boolean;
  startButtonRef: React.RefObject<HTMLDivElement>;
}

const StartMenu: React.FC<StartMenuProps> = ({
  changeState,
  startMenuRef,
  setValues,
  setStartMenuVisible,
  setShutdown,
  username,
  startMenuVisible,
  startButtonRef,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startButtonRef.current &&
        !startButtonRef.current.contains(event.target as Node) &&
        (!startMenuRef.current || !startMenuRef.current.contains(event.target as Node))
      ) {
        setTimeout(() => {
          setStartMenuVisible(false);
        }, 100);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuRef]);

  const handleLogout = async () => {
    setStartMenuVisible!(false);
    await Logout();
    changeState!("login", { name: "", score: 0 });
  };

  type StartButton = {
    icon: string;
    label: string;
    action: () => void;
  };
  const startButtons: StartButton[] = [
    {
      icon: FolderIcon.src,
      label: "Quik Quiz",
      action: () => AddNewWindow(setValues, "Quiz", "quiz", { triviaQuestions: [], answers: [], selected: null, correct: null }),
    },
    { icon: Notepad.src, label: "Notepad", action: () => AddNewWindow(setValues, "Note", "note", { title: "", data: "" }) },
    { icon: LogoutIcon.src, label: "Log off " + username, action: () => handleLogout() },
    { icon: Shutdown.src, label: "Shutdown", action: () => setShutdown!(true) },
  ];

  if (startMenuVisible) {
    return (
      <div
        ref={startMenuRef}
        className="mb-9 mr-auto mt-auto flex h-80 w-72 border border-b-greydark border-l-white border-r-greydark border-t-white bg-greyTaskBar"
      >
        <div
          className="ml-[1px] mt-[1px] h-full w-10"
          style={{
            background: "linear-gradient(135deg,#00007b 0%,#0000ff 5%,#00007b 100%)",
          }}
        ></div>
        <div className="flex h-full w-full flex-col gap-2 py-2 ">
          {startButtons.map((data, index) => (
            <button
              key={index}
              onMouseEnter={() => {
                setIsHovered(true), setHovered(index);
              }}
              onMouseLeave={() => {
                setIsHovered(false), setHovered(null);
              }}
              onClick={() => {
                data.action();
              }}
              className={` flex h-11 w-full flex-row ${index === 0 && "mt-auto"}  items-center px-2 ${
                isHovered && hovered === index && "bg-hoverBlue"
              } ${isHovered && hovered === index && "text-white"}`}
            >
              <img src={data.icon} className="h-auto w-10" />
              <p className={"pl-2"}>{data.label}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }
};

export default StartMenu;
