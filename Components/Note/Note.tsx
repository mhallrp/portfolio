import { useState } from "react";

const Note = () => {
  const [text, setText] = useState("");

  return (
        <div className="flex flex-col bg-white">
          <textarea
            maxLength={250}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-none resize outline-none md:w-[500px] h-96"
            rows={9}
          />
          <label className=" mr-1 text-right text-xs text-greyanswerb">{text.length}/250</label>
        </div>
  );
};

export default Note;
