import { AuthResponse, LoginResponse, UserData } from "../Types";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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
        console.log("Error");
        return { data: { name: "", score: 0 }, success: false };
      }
    } catch (networkError) {
      console.log("Network error");
      return { data: { name: "", score: 0 }, success: false };
    }
  }
  console.log("API Key error");
  return { data: { name: "", score: 0 }, success: false };
};

export const Login = async (username: string, password: string): Promise<LoginResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ user: { username, password } }),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = data.errorMessage || "Login failed for an unknown reason";
        return {
          data: { name: "", score: 0 },
          error: errorMessage,
          status: false,
        };
      }
      return { data: data, status: true, error: "" };
    } catch (networkError) {
      return {
        data: { name: "", score: 0 },
        error: "Network error occurred",
        status: false,
      };
    }
  }
  return {
    data: { name: "", score: 0 },
    error: "API key is undefined",
    status: false,
  };
};

export const Register = async (username: string, password: string): Promise<AuthResponse> => {
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ user: { username, password } }),
      });
      const data = await response.json();
      return { status: response.ok, error: "" };
    } catch (error) {
      return { status: false, error: error };
    }
  }
  return { status: false, error: "API key is undefined" };
};

export const Logout = async () => {
  if (typeof apiKey !== "undefined") {
    try {
      const response = await fetch(`https://request.matt-hall.dev/user/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      });
      const data = await response.json();
      return { data, status: response.ok };
    } catch (networkError) {
      console.error("Network error:", networkError);
      return { error: "Network error occurred", status: false };
    }
  }
};
