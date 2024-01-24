import { useState } from "react";

interface CancelButtonProps {
  action: () => void;
  title: string;
}

const ConfirmButton: React.FC<CancelButtonProps> = ({ action, title }) => {
  const [isHeld, setIsHeld] = useState(false);

  return (
    <div
      className={`mt-2 h-fit border
        ${isHeld ? "border-b-white" : "border-b-black"} 
        ${isHeld ? "border-r-white" : "border-r-black"}
        ${isHeld ? "border-t-black" : "border-t-white"}
        ${isHeld ? "border-l-black" : "border-l-white"}`}
    >
      <button
        onMouseDown={() => setIsHeld(true)}
        onMouseUp={() => setIsHeld(false)}
        onMouseLeave={() => setIsHeld(false)}
        className={`text-bold min-w-20 border py-[2px] text-black`}
        onClick={action}
        type="button"
      >
       {title}
      </button>
    </div>
  );
};

export default ConfirmButton;
