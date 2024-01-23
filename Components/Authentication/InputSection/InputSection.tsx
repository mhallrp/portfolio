import { InputErrors, FormData, UserData, Values } from "../../../Types";
import { PASSWORD_REQUIREMENTS } from "../../../constants";
import PasswordInput from "../PasswordInput";
import UsernameInput from "../UsernameInput";
import SubmitButton from "../../Buttons/SubmitButton";
import CancelButton from "../../Buttons/CancelButton";
import { HandleSubmit, CheckUsername } from "@/Model/authLogic";
import { AddNewWindow } from "@/Model/WindowLogic";

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
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (CheckUsername(formData.username)) {
            setLoading(true);
            const result = await HandleSubmit(e, formData, changeState, disableButton);
            if (!result) {
              setLoading(false);
            }
          } else {
            AddNewWindow(setValues, "error", { title: "Error", data: "error" });
          }
        }}
      >
        <UsernameInput formData={formData} setFormData={setFormData} />
        <div className="flex flex-col items-start justify-center">
          <PasswordInput confirm={false} setFormData={setFormData} formData={formData} labelData="Password:" />
          {formData.isRegister && <PasswordInput confirm={true} setFormData={setFormData} formData={formData} labelData="Confirm:" />}
        </div>
        <div className="flex w-full justify-end gap-2">
          <SubmitButton label={"Submit"} action={() => {}} />
          <CancelButton action={() => {}} />
        </div>
      </form>
    </>
  );
};

export default AuthInputSection;