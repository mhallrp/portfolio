import WarningIcon from "../../assets/warningIcon.png";

const WarningView = () => {
  return (
    <div className="flex flex-row ">
      <img className="m-8 h-9 w-auto" src={WarningIcon.src} alt="warningimg" />
      <div className="flex flex-col">
        <h1>Error</h1>
        <p>Some info about the error</p>
      </div>
    </div>
  );
};

export default WarningView;
