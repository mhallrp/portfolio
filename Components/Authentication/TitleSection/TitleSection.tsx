import { FormData } from "@/Types";

interface TitleSectionProps {
  formData: FormData;
}

const TitleSection: React.FC<TitleSectionProps> = ({ formData }) => {
  return (
    <h2 className="max-w-96 py-4 text-left font-nunito text-black">
      {formData.isRegister
        ? "Choose a user name and password to create an acount on portfolio 98."
        : `Type a user name and password to log into portfolio 98.`}
    </h2>
  );
};

export default TitleSection;
