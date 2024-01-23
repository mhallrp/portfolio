"use client";

import React, { useState, useEffect } from "react";
import { getSessionStatus } from "@/Model/authOutcalls";
import Desktop from "../Components/Desktop";

interface UserData {
  name: string;
  score: number;
}

interface SessionResponse {
  success: boolean;
  data: UserData;
}

export default function App() {

  const [sessionData, setSessionData] = useState<SessionResponse>({ success: false, data: { name: "", score: 0 } });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSessionStatus();
      setSessionData(response);
        console.log("result: ", response.success);
    };

    fetchData();
  }, []);

  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-white`}>
      <Desktop
        initialUserData={{ name: sessionData.data.name, score: sessionData.data.score }}
        initialState={true ? "quiz" : "login"}
      />
    </div>
  );
}
