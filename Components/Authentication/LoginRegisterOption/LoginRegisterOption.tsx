import { FormData } from "@/Types";

interface LoginRegisterProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const LoginRegisterOption: React.FC<LoginRegisterProps> = ({ formData, setFormData }) => {
  return (
    <div className="mb-4 mt-4 flex w-full flex-row gap-2">
      {formData.isRegister ? "Already have an account?" : "Dont have an account?"}
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
  );
};

export default LoginRegisterOption;
