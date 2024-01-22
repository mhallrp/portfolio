import { Register, Login } from "./authOutcalls";
import { UserData, FormData } from "../Types";

export const UserInputCheck = (userFocus: boolean, username: string) => {
  //User is not editing or input value is 0 (no errors)
  if (userFocus || username.length < 1) {
    return true;
  } else if (username.length < 4 || username.length > 20) {
    return userFocus;
  }
  return true;
};

export const CheckUsername = (username: string) => {
  if (username.length < 4 || username.length > 20) {
    return false;
  }
  return true;
};

export const PasswordInputCheck = (formData: FormData) => {
  if (formData.password.length === 0) {
    return { state: false, message: "" };
  }
  if (formData.password.length < 4) {
    return { state: true, message: "Password too short" };
  }
  if (formData.password.length > 20) {
    return { state: true, message: "Password too long" };
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(formData.password)) {
    return {
      state: true,
      message: "Complexity issue",
    };
  }
  if (formData.isRegister && formData.confirmPassword.length !== 0 && formData.password !== formData.confirmPassword) {
    return { state: true, message: "Passwords do not match" };
  }
  return { state: false, message: "" };
};

export const CheckFormData = (formData: FormData) => {
  if (formData.isRegister && formData.password !== formData.confirmPassword) {
    return { result: true, message: "Passwords do not match." };
  }
  if (formData.username.length < 4 || formData.username.length > 20) {
    return {
      result: true,
      message: "Username must be between 4 and 20 characters.",
    };
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(formData.password)) {
    return {
      result: true,
      message: "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    };
  }
  return { result: false, message: "" };
};

export const HandleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: FormData,
  changeState: (state: string, userData: UserData) => void,
  disableButton: boolean,
) => {
  if (disableButton) {
    return false;
  }
  e.preventDefault();
  if (formData.isRegister) {
    const response = await Register(formData.username, formData.password);
    if (!response.status) {
      return false;
    }
  }
  const { data, error, status } = await Login(formData.username, formData.password);
  if (status) {
    changeState("quiz", { name: data.name, score: data.score });
    return true;
  } else {
    return false;
  }
};
