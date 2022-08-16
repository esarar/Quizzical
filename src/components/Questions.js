import React from "react";
import { decode } from "html-entities";

function Questions({ quest }) {
  return (
    <div className="quiz--questions">
      <p>{decode(quest.question)}</p>
    </div>
  );
}

export default Questions;
