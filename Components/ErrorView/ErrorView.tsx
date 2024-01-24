import { WindowData } from "@/Types";
import WarningIcon from "../../assets/warningIcon.png";
import CancelButton from "../Buttons/DismissButton";
import { Values } from "@/Types";

interface ErrorViewProps {
  errorData: WindowData;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values[]>>;
}

const ErrorView: React.FC<ErrorViewProps> = ({ errorData, values, setValues }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center mx-4 mt-4">
        <div className="mb-auto h-full ">
          <img className="h-10 w-auto mr-6" src={WarningIcon.src} alt="warningimg" />
        </div>
        <div className="flex h-full flex-col items-center">
          <p>{errorData.data}</p>
        </div>
      </div>
      <div className="h-fit w-fit my-4 mx-auto">
          <CancelButton
          title="Close"
            action={() => {
              console.log("something");
              setValues((prevValues) => prevValues.filter((item) => item.id !== values.id));
            }}
          />
        </div>
    </div>
  );
};

export default ErrorView;
