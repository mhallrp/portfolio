import { useState } from "react";
import { FormData } from "@/Types";
import { UserInputCheck } from "../../../Model/authLogic";

interface UsernameInputProps{
    formData:FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const UsernameInput:React.FC<UsernameInputProps> = ({formData, setFormData}) => {

    const [userFocus, setUserFocus] = useState(false);

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="mb-2 flex flex-row items-center">
        <label className="min-w-[100px] text-md  text-black" htmlFor="username">
          Username:
        </label>
        <input
          onFocus={() => {
            setUserFocus(true);
          }}
          onBlur={() => {
            setUserFocus(false);
          }}
          className="p-[3px] w-full border outline-none"
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
  );
};

export default UsernameInput