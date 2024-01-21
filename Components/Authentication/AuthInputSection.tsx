import { UserInputCheck } from "../../Model/authLogic";
import { SetStateType, InputErrors, FormData } from "../../Types";
import { useState } from "react";
import { PASSWORD_REQUIREMENTS } from "../../constants";
import PasswordInput from "./AuthPasswordInput";

interface InputSectionProps {
  formData: FormData;
  setFormData: SetStateType<FormData>;
  inputErrors: InputErrors;
  error:boolean
}

const AuthInputSection: React.FC<InputSectionProps> = ({ formData, setFormData, inputErrors, error }) => {
  const [userFocus, setUserFocus] = useState(false);
  return (
    <>
      <h2 className="py-5 text-left font-nunito text-black">
        {formData.isRegister ? "Choose a user name and password to create an acount on portfolio 98" : "Type a user name and password to log into Windoors."}
      </h2>
      <div className="flex w-full flex-col justify-center">
        <div className="mb-4 flex flex-row items-center">
          <label className="w-18 text-md mb-1 mr-3 text-black" htmlFor="username">
            Username:
          </label>
          <input
            onFocus={() => {
              setUserFocus(true);
            }}
            onBlur={() => {
              setUserFocus(false);
            }}
            className={`p-[3px] w-48 border outline-none  ${
              formData.isRegister && !UserInputCheck(userFocus, formData.username) && "border-red-600"
            } w-18 p-1`}
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                username: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex flex-row items-center">
          <label className="w-18 text-md mr-4 text-black" htmlFor="password">
            Password:
          </label>
          <PasswordInput confirm={false} setFormData={setFormData} formData={formData} inputErrors={inputErrors} />
        </div>
        {formData.isRegister && (
          <div className="flex flex-row mr-4 mt-4 items-center">
            <label className="w-18 text-md mr-7 text-black" htmlFor="password">
              Confirm:
            </label>
            <PasswordInput confirm={true} setFormData={setFormData} formData={formData} inputErrors={inputErrors} />
          </div>
        )}
      </div>


    </>
  );
};

export default AuthInputSection;
