import { useState } from "react";
import InputSection from "./InputSection";
import { FormData, UserData, Values } from "../../Types";
import ImageSection from "./ImageSection";
import LoginRegister from "./LoginRegisterOption/LoginRegisterOption";
import TitleSection from "./TitleSection/TitleSection";

interface AuthenticationProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const Authentication: React.FC<AuthenticationProps> = ({ setState, setValues, setUserData }) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    isRegister: false,
  });

  return (
    <div className="z-50 flex">
      <ImageSection />
      <div className={`items-left mr-4 flex flex-col justify-start  ${loading && "pointer-events-none"}`}>
        <TitleSection formData={formData} />
        <InputSection
          formData={formData}
          setFormData={setFormData}
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
