import LoginIcon from "@/assets/loginIcon.png";

const ImageSection = () => {
  return (
    <div className="mx-4 mt-4 flex h-full w-24 ">
      <img src={LoginIcon.src} alt="loginIcon" className="h-auto w-full " />
    </div>
  );
};

export default ImageSection;
