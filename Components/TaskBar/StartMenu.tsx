import Shutdown from "../../assets/shutdown.png";
import Notepad from "../../assets/notepad.png";
import LogoutIcon from "../../assets/logoutIcon.png";
import { useState, useEffect } from "react";
import { Logout } from "../../Model/authOutcalls";
import { Values, UserData } from "../../Types";
import FolderIcon from "../../assets/folderIcon.png";

export interface StartMenuProps {
  changeState: (state: string, userData: UserData) => void;
  startMenuRef: React.RefObject<HTMLDivElement>;
  setNotes: React.Dispatch<React.SetStateAction<Values[]>>;
  setStartMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShutdown: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  startMenuVisible: boolean;
  startButtonRef: React.RefObject<HTMLDivElement>;
}

const StartMenu: React.FC<StartMenuProps> = ({
  changeState,
  startMenuRef,
  setNotes,
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
        (!startMenuRef.current ||
          !startMenuRef.current.contains(event.target as Node))
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

  type ItemType = "quiz" | "note" | "error";

  const addItem = (itemType: ItemType) => {
    setNotes((prev) => {
      let value = 10;
      let valueArray = [];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].positionX % 10 === 0) {
          valueArray.push(prev[i].positionX);
        }
      }
      valueArray.sort((a, b) => a - b);
      while (valueArray.includes(value)) {
        value += 10;
      }
      const newItem = {
        id: Date.now(),
        title: itemType.charAt(0).toUpperCase() + itemType.slice(1),
        positionX: value,
        positionY: value,
        type: itemType,
        data:
          itemType === "quiz"
            ? {
                triviaQuestions: [],
                answers: [],
                selected: null,
                correct: null,
              }
            : { title: "", data: "" },
      };
      return [...prev, newItem];
    });
  };

  const startButtons = [
    [FolderIcon.src, "Quik Quiz"],
    [Notepad.src, "Notepad"],
    [LogoutIcon.src, "Log off " + username],
    [Shutdown.src, "Shutdown"],
  ];

  const handleStartButton = (index: number) => {
    switch (index) {
      case 0:
        addItem("quiz");
        break;
      case 1:
        addItem("note");
        break;
      case 2:
        handleLogout();
        break;
      default:
        setShutdown!(true);
        break;
    }
    setStartMenuVisible!(false);
  };

  if (startMenuVisible) {
    return (
      <div
        ref={startMenuRef}
        className="mb-9 mr-auto mt-auto flex h-80 w-72 border border-b-greydark border-l-white border-r-greydark border-t-white bg-greyTaskBar"
      >
        <div
          className="ml-[1px] mt-[1px] h-full w-10"
          style={{
            background:
              "linear-gradient(135deg,#00007b 0%,#0000ff 5%,#00007b 100%)",
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
                handleStartButton(index);
              }}
              className={` flex h-11 w-full flex-row ${
                index === 0 && "mt-auto"
              }  items-center px-2 ${
                isHovered && hovered === index && "bg-hoverBlue"
              } ${isHovered && hovered === index && "text-white"}`}
            >
              <img src={data[0]} className="h-auto w-10" />
              <p className={"pl-2"}>{data[1]}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }
};

export default StartMenu;
