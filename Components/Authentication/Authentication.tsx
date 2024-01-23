import { useEffect, useState } from "react";
import { CheckFormData, PasswordInputCheck } from "../../Model/authLogic";
import InputSection from "./InputSection";
import { FormData, InputErrors, UserData, Values } from "../../Types";
import ImageSection from "./ImageSection";
import LoginRegister from "./LoginRegisterOption/LoginRegisterOption";
import TitleSection from "./TitleSection/TitleSection";

interface AuthenticationProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const Authentication: React.FC<AuthenticationProps> = ({ setState, setValues, setUserData }) => {
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [inputErrors, setInputErrors] = useState<InputErrors>({
  //   usernameError: "",
  //   passwordError: "",
  // });
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

  // useEffect(() => {
  //   const inputCheck = PasswordInputCheck(formData);
  //   setInputErrors((prevErrors) => ({
  //     ...prevErrors,
  //     passwordError: inputCheck.message,
  //   }));
  // }, [formData]);

  return (
    <div className="z-50 flex">
      <ImageSection />
      <div className={`items-left mr-4 flex flex-col justify-start  ${loading && "pointer-events-none"}`}>
        <TitleSection formData={formData} />
        <InputSection
          formData={formData}
          setFormData={setFormData}
          disableButton={disableButton}
          setState={setState}
          setLoading={setLoading}
          setValues={setValues}
          setUserData={setUserData}
        />
        <LoginRegister formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default Authentication;
