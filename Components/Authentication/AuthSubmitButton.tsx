
interface AuthSubmitButtonProps {
  disableButton: boolean;
  isRegister: boolean;
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({ disableButton, isRegister }) => {
  return (
    <>
      <button
        disabled={isRegister && disableButton}
        className={`px-8 py-[2px] mt-4 border text-bold border-t-white border-l-white border-b-greydark border-r-greydark text-black`}
        type="submit"
      >
        OK
      </button>
    </>
  );
};

export default AuthSubmitButton;
