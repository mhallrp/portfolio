import { useEffect, useState } from "react";
import { CheckFormData, PasswordInputCheck } from "../../Model/authLogic";
import InputSection from "./InputSection";
import { FormData, InputErrors, UserData, Values } from "../../Types";
import ImageSection from "./ImageSection";
import LoginRegister from "./LoginRegisterOption/LoginRegisterOption";
import TitleSection from "./TitleSection/TitleSection";

interface AuthenticationProps {
  changeState: (state: string, userData: UserData) => void;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
}

const Authentication: React.FC<AuthenticationProps> = ({ changeState, setValues }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="z-50 flex">
      <ImageSection />
      <div className={`items-left mr-4 flex flex-col justify-start  ${loading && "pointer-events-none"}`}>
        <TitleSection formData={formData} />
        <InputSection
          formData={formData}
          setFormData={setFormData}
          inputErrors={inputErrors}
          disableButton={disableButton}
          changeState={changeState}
          setLoading={setLoading}
          setValues={setValues}
        />
        <LoginRegister formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default Authentication;
