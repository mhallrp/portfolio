"use client";
import Desktop from "../Components/Desktop";
const apiKey = process.env.API_KEY;
async function getSessionStatus() {
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/check`, {
        credentials: "include",
        headers: {
          "X-API-Key": apiKey,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("response is ok");
        return { data: data, success: true };
      } else {
        console.log("response error");
        return { data: data.error, success: false };
      }
    } catch (networkError) {
      console.log("network error");
      return { data: "Network error occurred", success: false };
    }
  }
  console.log("api key is bad");
  return { data: "API key is undefined", success: false };
}

export default async function App() {
  const data = await getSessionStatus();
  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-windoorsGreen`}>
      <Desktop initialUserData={ data.success ? { name: data.data.name, score: data.data.score } : { name: "", score: 0 } } initialState={"login"} />
    </div>
  );
}
