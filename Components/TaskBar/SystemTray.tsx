"use client";

import { useEffect, useState } from "react";

const SystemTray = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="border border-b-white border-l-greydark border-r-white border-t-greydark px-2">
      {currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
};

export default SystemTray;
