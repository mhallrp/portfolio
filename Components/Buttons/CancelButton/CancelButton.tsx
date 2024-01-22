import { useState } from "react";

interface CancelButtonProps {
    action: () => void;
  }

const CancelButton:React.FC<CancelButtonProps> = (action) => {

const [isHeld, setIsHeld] = useState(false);

  return (
    <div
      className={`border h-fit mt-2
        ${isHeld ? "border-b-white" : "border-b-black"} 
        ${isHeld ? "border-r-white" : "border-r-black"}
        ${isHeld ? "border-t-black" : "border-t-white"}
        ${isHeld ? "border-l-black" : "border-l-white"}`}
    >
      <button
        onMouseDown={() => {
          setIsHeld(true);
        }}
        onMouseUp={() => setIsHeld(false)}
        onMouseLeave={() => setIsHeld(false)}
        className={`min-w-20 py-[2px] border text-bold text-black`}
        onClick={() => action}
        type="button"
      >
        Cancel
      </button>
    </div>
  );
};

export default CancelButton;
