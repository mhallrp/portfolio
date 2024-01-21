import { AuthResponse, LoginResponse } from "../Types";

const apiKey = process.env.NEXT_PRODUCTION_API_KEY;

export const SessionCheck = async () => {
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
        return { error: data.error, success: false };
      }
    } catch (networkError) {
      return { error: "Network error occurred", success: false };
    }
  }
  return { error: "API key is undefined", success: false };
};


export const Login = async (username: string, password: string): Promise<LoginResponse> => {
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
