import { Values, QuizData, WindowData } from "@/Types";

export const AddNewWindow = (setValues: React.Dispatch<React.SetStateAction<Values[]>>, type: string, data: QuizData | WindowData) => {
  setValues((prev) => {
    let value = 10;
    let valueArray = [];
    for (let i = 0; i < prev.length; i++) {
      if (prev[i].positionX % 10 === 0) {
        valueArray.push(prev[i].positionX);
      }
    }
    valueArray.sort((a, b) => a - b);
    while (valueArray.includes(value)) {
      value += 10;
    }
    const newItem = {
      id: Date.now(),
      positionX: value,
      positionY: value,
      type: type,
      data: data,
    };
    return [...prev, newItem];
  });
};
