
'use server'
import { UserData } from "@/Types";
interface SessionResponse {
    success: boolean;
    data: UserData;
  }

export const getSessionStatus = async (): Promise<SessionResponse> => {

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
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
          return { data: { name: "", score: 0 }, success: false };
        }
      } catch (networkError) {
        return { data: { name: "", score: 0 }, success: false };
      }
    }
    return { data: { name: "", score: 0 }, success: false };
  };