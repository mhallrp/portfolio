import { FormData } from "@/Types";

interface UsernameInputProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ formData, setFormData }) => {
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="mb-2 flex flex-row items-center">
        <label className="text-md min-w-[100px]  text-black" htmlFor="username">
          Username:
        </label>
        <input
          className="w-full border p-[3px] outline-none"
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

export default UsernameInput;
