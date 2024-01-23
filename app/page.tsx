import Desktop from "../Components/Desktop";

async function getSessionStatus() {
  // const apiKey = process.env.API_KEY;
  // if (typeof apiKey !== "undefined") {
  //   try {
  const response = await fetch(`https://request.matt-hall.dev/check`, {
    credentials: "include",
    headers: {
      "X-API-Key": process.env.API_KEY!,
    },
  });
  const data = await response.json();
  if (response.ok) {
    console.log("response bad " + response);
    return { data: data, success: true };
  } else {
    console.log("Response ok " + response);
    return { data: data.error, success: false };
  }
  //   } catch (networkError) {
  //     return { data: "Network error occurred", success: false };
  //   }
  // }
  // return { data: "API key is undefined", success: false };
}

export default async function App() {
  const data = await getSessionStatus();
  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-black`}>
      <Desktop initialUserData={data.success ? { name: data.data.name, score: data.data.score } : { name: "", score: 0 }} initialState={"login"} />
    </div>
  );
}
