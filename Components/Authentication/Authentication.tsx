"use client";
import { useRef, useEffect, useState } from "react";
import {
  HandleSubmit,
  CheckFormData,
  PasswordInputCheck,
} from "../../Model/authLogic";
import InputSection from "./AuthInputSection";
import { FormData, InputErrors, UserData } from "../../Types";
import AuthSubmitButton from "./AuthSubmitButton";
import LoginIcon from "../../assets/loginIcon.png";

interface AuthenticationProps {
  changeState: (state: string, userData: UserData) => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ changeState }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const authRef = useRef<HTMLDivElement>(null);
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    usernameError: "",
    passwordError: "",
  });

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    isRegister: false,
  });

  useEffect(() => {
    const checkData = CheckFormData(formData);
    setDisableButton(checkData.result);
  }, [formData.username, formData.password, formData.confirmPassword]);

  useEffect(() => {
    const inputCheck = PasswordInputCheck(formData);
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      passwordError: inputCheck.message,
    }));
  }, [formData]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await HandleSubmit(
      e,
      formData,
      changeState,
      disableButton,
      setError
    );
    if (!result) {
      setLoading(false);
      setError(true);
      setTimeout(function () {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div ref={authRef} className="z-50 flex ">
      <div className="mx-4 mt-6 flex h-full w-24 ">
        <img src={LoginIcon.src} alt="loginIcon" className="h-auto w-full " />
      </div>
      <div
        className={`items-left flex flex-row mr-4 justify-start  ${
          loading && "pointer-events-none"
        }`}
      >
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <InputSection
            formData={formData}
            setFormData={setFormData}
            inputErrors={inputErrors}
            error={error}
          />
          <AuthSubmitButton
            disableButton={disableButton}
            isRegister={formData.isRegister}
          />

          <div className="mt-4 flex w-full flex-row gap-2 mb-4">
            {formData.isRegister
              ? "Already have an account?"
              : "Dont have an account?"}
            <button
              onClick={() => {
                setFormData(() => ({
                  username: "",
                  password: "",
                  confirmPassword: "",
                  isRegister: !formData.isRegister,
                }));
              }}
              className="font-bold text-purple underline"
            >
              {formData.isRegister ? " Login here" : " Sign up here"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
