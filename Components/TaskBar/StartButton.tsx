import React, { useState, useRef } from "react";
import winDoors from "../../assets/winDoorsLogo.png";

interface StartButtonProps{
    setStartMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    startMenuVisible: boolean
    startButtonRef: React.RefObject<HTMLDivElement>;
}

const StartButton:React.FC<StartButtonProps> = ({setStartMenuVisible, startMenuVisible, startButtonRef}) => {
  const [isHeld, setIsHeld] = useState(false);

  const [startFocused, setStartFocused] = useState(false);

  return (
    <div
      className={`flex h-fit items-center border 
        ${isHeld ? "border-b-white" : "border-b-black"} 
        ${isHeld ? "border-r-white" : "border-r-black"}
        ${isHeld ? "border-t-black" : "border-t-white"}
        ${isHeld ? "border-l-black" : "border-l-white"}`}
      ref={startButtonRef}
    >
      <div
        onMouseDown={() => {
          setStartMenuVisible(!startMenuVisible);
          setStartFocused(true);
          setIsHeld(true);
        }}
        onMouseUp={() => setIsHeld(false)}
        onMouseLeave={() => setIsHeld(false)}
        className={`flex flex-row items-center border  
          ${isHeld ? "border-b-greyTaskBar" : "border-b-greydark"} 
          ${isHeld ? "border-r-greyTaskBar" : "border-r-greydark"}
          ${isHeld ? "border-t-greydark" : "border-t-greyTaskBar"}
          ${isHeld ? "border-l-greydark" : "border-l-greyTaskBar"}`}
      >
        <div
          className={`flex border border-dotted ${
            !startMenuVisible ? "border-greyTaskBar" : "border-greydark"
          } `}
        >
          <img
            className=" mr-[2px] mt-[0.5px] h-5 w-5"
            src={winDoors.src}
            alt="logo"
          />
          <button className="pr-2">Start</button>
        </div>
      </div>
    </div>
  );
}

export default StartButton