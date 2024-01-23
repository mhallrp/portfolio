import Desktop from "../Components/Desktop";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
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
        return { data: data, success: true };
      } else {
        return { data: data.error, success: false };
      }
    } catch (networkError) {
      return { data: "Network error occurred", success: false };
    }
  }
  return { data: "API key is undefined", success: false };
}

export default async function App() {
  const data = await getSessionStatus();
  console.log("success?: " + data.success)
  console.log("data: " + data.data)
  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-black`}>
      <Desktop initialUserData={ data.success ? { name: data.data.name, score: data.data.score } : { name: "", score: 0 } } initialState={ data.success ? "quiz" : "login" } />
    </div>
  );
}
