import { Register, Login } from "./authOutcalls";
import { UserData, FormData } from "../Types";

export const DataCheck = (formData: FormData) => {
  if (formData.username.length < 4 || formData.username.length > 20) {
    return { result: false, message: "Username must be between 4 and 20 characters in length." };
  }

  if (
    formData.password.length < 4 ||
    formData.password.length > 20 ||
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(formData.password)
  ) {
    return {
      result: false,
      message:
        "Password must be between 4 and 20 characters in length, contain 1 upper and lower case character aswell as a number and special character.",
    };
  }

  if (formData.isRegister && formData.password !== formData.confirmPassword) {
    return { result: false, message: "Passwords do not match." };
  }

  return { result: true };
};

export const HandleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: FormData,
  setState: React.Dispatch<React.SetStateAction<string>>,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
) => {
  e.preventDefault();
  if (formData.isRegister) {
    const registerResponse = await Register(formData.username, formData.password);
    if (!registerResponse.status) {
      return false;
    }
  }

  const loginResponse = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: formData.username, password: formData.password }),
  });

  if (loginResponse.ok) {
    const data = await loginResponse.json();
    setUserData({ name: data.name, score: data.score });
    setState("quiz");
    return true;
  } else {
    const { error } = await loginResponse.json();
    console.log(error); // Handle the error appropriately
    return false;
  }
};
