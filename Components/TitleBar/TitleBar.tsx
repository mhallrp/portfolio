import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Values } from "../../Types";
import Draggable from "react-draggable";

interface TitleBarProps {
  children: React.ReactNode;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
  zIndex: number;
  updateZIndex: React.Dispatch<React.SetStateAction<number>>;
  close: boolean;
}

const TitleBar: React.FC<TitleBarProps> = ({ children, values, setValues, zIndex, updateZIndex, close }) => {
  const [currentZIndex, setCurrentZIndex] = useState(50);
  const nodeRef = React.useRef(null);
  const handleClose = () => {
    setValues((prevValues) => prevValues.filter((item) => item.id !== values.id));
  };

  const handleDragStop = (e: any, data: any) => {
    setValues((prevValues) => prevValues.map((item) => (item.id === values.id ? { ...item, positionX: data.x, positionY: data.y } : item)));
  };

  const setZIndex = () => {
    if (currentZIndex <= zIndex) {
      updateZIndex(zIndex + 1);
      setCurrentZIndex(zIndex + 1);
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      onStart={() => setZIndex()}
      onStop={handleDragStop}
      position={{ x: values.positionX, y: values.positionY }}
      bounds={{ top: 0 }}
    >
      <div
        onClick={() => setZIndex()}
        ref={nodeRef}
        className="fixed w-auto border border-gray-300 bg-white font-sans"
        style={{ zIndex: currentZIndex }}
      >
        <div className="m-[1px] flex flex-col bg-greyTaskBar">
          <div
            className="handle h-22.5 m-[1px] flex items-center justify-between bg-[#000080]"
            style={{
              cursor: "default",
            }}
          >
            <label className="bold ml-1 w-full cursor-pointer text-left text-sm font-bold text-white" style={{ cursor: "default" }}>
              {values.data.title}
            </label>
            {close && (
              <div className="flex items-center">
                <FaTimes onClick={handleClose} className="cursor-pointer text-white" />
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default TitleBar;
