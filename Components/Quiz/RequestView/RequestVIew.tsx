// import { Generate } from "../../../Model/generateOutcalls";
// import { ShuffleArray } from "../../../Model/utils";
// import { useState } from "react";
// import { QuizRequestProps } from "../../../Types";

// const RequestView: React.FC<QuizRequestProps> = ({ setQuizData }) => {
//   const [generateValue, setGenerateValue] = useState<string>("");
//   const [generateAnswer, setGenerateAnswer] = useState("");

//   const gptCall = async () => {
//     const generate = await Generate(generateValue, generateAnswer);
//     const split = generate.split(",");
//     const newArray = [split[1], split[2], split[3], split[4]];
//     const answers = ShuffleArray(newArray.slice());
//     setQuizData({
//       triviaQuestions: [{ question: split[0], correct_answer: split[1], incorrect_answers: [split[2], split[3], split[4]] }],
//       answers: [...answers],
//       selected: null,
//       correct: null,
//     });
//   };

//   return (
//     <div className="mt-8 flex h-16 w-full content-center justify-center border-t bg-white px-4">
//       <button onClick={() => gptCall()}>Generate</button>
//       <input
//         className="my-auto ml-4 h-8 w-full bg-greyanswer"
//         placeholder="Context"
//         type="text"
//         value={generateValue}
//         onChange={(e) => setGenerateValue(e.target.value)}
//       ></input>
//       <input
//         className="my-auto ml-4 h-8 bg-greyanswer"
//         placeholder="Answer"
//         type="text"
//         value={generateAnswer}
//         onChange={(e) => setGenerateAnswer(e.target.value)}
//       ></input>
//     </div>
//   );
// };

// export default RequestView;
