import Desktop from "../Components/Desktop";
async function getSessionStatus() {
  const response = await fetch(`https://request.matt-hall.dev/check`, {
    credentials: "include",
    headers: {
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
    },
  });
  const data = await response.json();
  if (response.ok) {
    return { data: data, success: true };
  } else {
    return { data: data.error, success: false };
  }
}
export default async function App() {
  const data = await getSessionStatus();
  console.log(data.data);
  return (
    <div className={`flex h-dvh w-screen overflow-hidden bg-black`}>
      <Desktop initialUserData={data.success ? { name: data.data.name, score: data.data.score } : { name: "", score: 0 }} initialState={"login"} />
    </div>
  );
}
