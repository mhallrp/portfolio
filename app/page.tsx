'use client'

import React, { useState, useEffect } from 'react';
import { getSessionStatus } from "@/Model/authOutcalls";
import Desktop from "../Components/Desktop";

interface UserData {
  name: string;
  score: number;
}

interface SessionResponse {
  success: boolean;
  data: string | UserData | null;
}

export default function App() {
  const [sessionData, setSessionData] = useState<SessionResponse>({ success: false, data: null });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSessionStatus();
      setSessionData(response);
    };

    fetchData();
  }, []);

  console.log("success?: " + sessionData.success);
  console.log("data: " + sessionData.data);

  const userData = typeof sessionData.data === 'object' ? sessionData.data : null;

  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-white`}>
      <h1>{"data: " + (userData ? userData.name : 'No data')}</h1>
      <Desktop
        initialUserData={sessionData.success && userData ? { name: userData.name, score: userData.score } : { name: "", score: 0 }}
        initialState={sessionData.success && userData ? "quiz" : "login"}
      />
    </div>
  );
}
