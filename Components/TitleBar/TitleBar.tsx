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

const TitleBar: React.FC<TitleBarProps> = ({
  children,
  values,
  setValues,
  zIndex,
  updateZIndex,
  close,
}) => {
  const [currentZIndex, setCurrentZIndex] = useState(50);
  const [titleValue, setTitle] = useState(values.title);
  const [isEditing, setIsEditing] = useState(false);
  const nodeRef = React.useRef(null);
  const handleClose = () => {
    setValues((prevValues) =>
      prevValues.filter((item) => item.id !== values.id)
    );
  };

  const handleTitleDoubleClick = () => {
    if (close) {
      if (titleValue == "New note") {
        setTitle("");
      }
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (titleValue) {
      setIsEditing(false);
    } else {
      setTitle("New note");
      setIsEditing(false);
    }
  };

  const handleDragStop = (e: any, data: any) => {
    setValues((prevValues) =>
      prevValues.map((item) =>
        item.id === values.id
          ? { ...item, positionX: data.x, positionY: data.y }
          : item
      )
    );
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
              className="handle h-22.5 m-[1px] flex items-center justify-between"
              style={{
                cursor: "default",
                background: "linear-gradient(90deg, navy, #1084d0)",
              }}
            >
              {close && (
                <div className="invisible">
                  <FaTimes className="opacity-0" />
                </div>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={titleValue}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  autoFocus
                  className="w-full bg-gray-200 text-center outline-none"
                />
              ) : (
                <label
                  onDoubleClick={handleTitleDoubleClick}
                  className=" bold w-full pl-2 font-bold cursor-pointer text-left text-sm text-white"
                  style={{ cursor: "default" }}
                >
                  {titleValue}
                </label>
              )}
              {close && (
                <div className="flex items-center">
                  <FaTimes
                    onClick={handleClose}
                    className="cursor-pointer text-white"
                  />
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
