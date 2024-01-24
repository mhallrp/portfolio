import { useState } from "react";

interface PrimaryButtonProps {
  label:string;
  action: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, action }) => {
  const [isHeld, setIsHeld] = useState(false);
  return (
    <div className={`mt-2 h-fit border border-black`}>
      <button
        onMouseDown={() => {
          setIsHeld(true);
        }}
        onMouseUp={() => setIsHeld(false)}
        onMouseLeave={() => setIsHeld(false)}
        className={`min-w-20 border py-[2px] 
        ${isHeld ? "border-b-white" : "border-b-black"} 
        ${isHeld ? "border-r-white" : "border-r-black"}
        ${isHeld ? "border-t-black" : "border-t-white"}
        ${isHeld ? "border-l-black" : "border-l-white"}
        text-bold text-black
          `}
        onClick={action}
      >
        {label}
      </button>
    </div>
  );
};

export default PrimaryButton;
