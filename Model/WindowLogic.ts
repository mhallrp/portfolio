import { Values, QuizData, WindowData } from "@/Types";

export const AddNewWindow = (setValues: React.Dispatch<React.SetStateAction<Values[]>>, type: string, data: QuizData | WindowData) => {
  setValues((prev) => {
    const newItem = {
      id: Date.now(),
      positionX: 9999,
      positionY: 9999,
      type: type,
      data: data,
    };
    return [...prev, newItem];
  });
};
