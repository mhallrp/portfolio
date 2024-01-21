export interface AnswerCardProps {
  correct: boolean;
  selected: boolean;
  answer: number | null;
  text: string;
  setSelected: () => void;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ correct, selected, answer, text, setSelected }) => {
  const getBackground = () => {
    if (correct) {
      return "bg-correct border-correctBorder text-black";
    } else if (selected) {
      if (answer === null) {
        return "bg-selected border-purple text-white";
      } else {
        return "bg-incorrect border-incorrectBorder text-black";
      }
    } else {
      return "bg-greyanswer border-greyanswerb text-greytext";
    }
  };

  return (
    <button
      className={`${getBackground()} flex h-auto w-full items-center justify-center rounded-xl border-2 p-2 text-center sm:h-36 sm:w-52`}
      onClick={setSelected}
    >
      <p>{text}</p>
    </button>
  );
};

export default AnswerCard;
