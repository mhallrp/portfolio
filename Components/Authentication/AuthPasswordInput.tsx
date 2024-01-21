import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { SetStateType, FormData, InputErrors } from "../../Types";

interface PasswordInputProps {
  confirm: boolean;
  setFormData: SetStateType<FormData>;
  formData: FormData;
  inputErrors: InputErrors;
}

const AuthPasswordInput: React.FC<PasswordInputProps> = ({ confirm, formData, setFormData, inputErrors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    
    <div className={`relative z-10 flex w-48 items-center content-center justify-center`}>
      <input
        type={showPassword ? "text" : "password"}
        className={`w-48 border p-[3px] outline-none 
        ${formData.isRegister && inputErrors.passwordError === "Passwords do not match" && "border-red-600"} 
        ${formData.isRegister && inputErrors.passwordError !== "" && !confirm && "border-red-600"}`}
        value={confirm ? formData.confirmPassword : formData.password}
        onChange={(e) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [confirm ? "confirmPassword" : "password"]: e.target.value,
          }));
        }}
      />
      <button
        type="button"
        onClick={(e) => togglePasswordVisibility(e)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
        tabIndex={-1}
      >
        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
      </button>
    </div>
  );
};

export default AuthPasswordInput;
