import { InputErrors, FormData, UserData, Values } from "../../../Types";
import { PASSWORD_REQUIREMENTS } from "../../../constants";
import PasswordInput from "../PasswordInput";
import UsernameInput from "../UsernameInput";
import SubmitButton from "../../Buttons/SubmitButton";
import CancelButton from "../../Buttons/CancelButton";
import { HandleSubmit, CheckUsername } from "@/Model/authLogic";
import { useState } from "react";

interface InputSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  inputErrors: InputErrors;
  disableButton: boolean;
  changeState: (state: string, userData: UserData) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
}


const AuthInputSection: React.FC<InputSectionProps> = ({ formData, setFormData, inputErrors, disableButton, changeState, setLoading, setValues }) => {
  const [error, setError] = useState(false);
  return (
    <>
      <form
        onSubmit={async (e) => {
            e.preventDefault();
          if (CheckUsername(formData.username)) {
            setLoading(true);
            const result = await HandleSubmit(e, formData, changeState, disableButton, setError);
            if (!result) {
              setLoading(false);
              setError(true);
              setTimeout(function () {
                setError(false);
              }, 2000);
            }
          } else {
            setValues((prev) => {
                let value = 10;
                let valueArray = [];
                for (let i = 0; i < prev.length; i++) {
                  if (prev[i].positionX % 10 === 0) {
                    valueArray.push(prev[i].positionX);
                  }
                }
                valueArray.sort((a, b) => a - b);
                while (valueArray.includes(value)) {
                  value += 10;
                }
                const newItem = {
                  id: Date.now(),
                  title: "Error",
                  positionX: value,
                  positionY: value,
                  type: "error",
                  data:{ title: "error", data: "error" },
                };
                return [...prev, newItem];
              });
          }
        }}
      >
        <UsernameInput formData={formData} setFormData={setFormData} />
        <div className="flex flex-col items-start justify-center">
          <PasswordInput confirm={false} setFormData={setFormData} formData={formData} inputErrors={inputErrors} labelData="Password:" />
          {formData.isRegister && (
            <PasswordInput confirm={true} setFormData={setFormData} formData={formData} inputErrors={inputErrors} labelData="Confirm:" />
          )}
        </div>
        <div className="flex w-full justify-end gap-2">
          <SubmitButton label={"Submit"} action={()=>{}}/>
          {/* Below is the button that should not be submitting the form: */}
          <CancelButton action={() =>{}}/>
        </div>
      </form>
    </>
  );
};

export default AuthInputSection;
