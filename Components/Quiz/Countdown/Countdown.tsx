import React, { useState, useEffect } from "react";

export interface QuizCountdownProps {
  duration: number;
  key: number;
  startCountdown: boolean;
}

const Countdown: React.FC<QuizCountdownProps> = ({
  duration,
  startCountdown,
}) => {
  const [width, setWidth] = useState(100);

  const interval = setInterval(() => {
    if (startCountdown) {
      setWidth((prevWidth) => {
        if (prevWidth > 0) {
          return Math.max(prevWidth - 100 / duration, 0);
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }
  }, 1000);

  const updateWidth = () => {
    if (startCountdown) {
      setWidth((prevWidth) => Math.max(prevWidth - 100 / duration, 0));
      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    updateWidth();
  }, [duration]);

  useEffect(() => {
    updateWidth();
  }, [startCountdown]);

  const meterStyle = {
    width: `${width}%`,
    transition: "width 1s linear",
  };

  return (
    <div className="pv flex h-1 w-full bg-white">
      <div className={`h-1 w-full bg-purple`} style={meterStyle} />
    </div>
  );
};

export default Countdown;
