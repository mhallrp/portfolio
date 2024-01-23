import Desktop from "../Components/Desktop";

export default async function App() {
  async function getSessionStatus() {
    'use server'
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (typeof apiKey !== "undefined") {
      try {
        const response = await fetch(`https://request.matt-hall.dev/check`, {
          cache: 'no-store',
          credentials: "include",
          headers: { "X-API-Key": apiKey },
        });
        const data = await response.json();
        return { 
          success: response.ok,
          data: data.data || data.message
        };
      } catch (networkError) {
        return { success: false, data: "Network error occurred" };
      }
    }
    return { success: false, data: "API key is undefined" };
  }

  const { success, data } = await getSessionStatus();
  console.log("success?: " + success);
  console.log("data: " + data);
  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-white`}>
      <h1>{"data: " + data}</h1>
      <Desktop
        initialUserData={success && data.name ? { name: data.name, score: data.score } : { name: "", score: 0 }}
        initialState={success && !data.error ? "quiz" : "login"}
      />
    </div>
  );
}
