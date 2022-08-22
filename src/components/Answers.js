import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

function Answers({ quest, answersClick }) {
  const [allAnswers, setAllAnswers] = React.useState([]);

  const incorrectAnswer = quest.incorrect_answers;

  const correctAnswer = quest.correct_answer;

  incorrectAnswer.push(correctAnswer);

  let uniqueChars = [];
  incorrectAnswer.forEach((c) => {
    if (!uniqueChars.includes(c)) {
      uniqueChars.push(c);
    }
  });

  // Yates Shuffle
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  React.useEffect(() => {
    setAllAnswers(shuffle(uniqueChars));
    // eslint-disable-next-line
  }, []);

  const newAnswers = Array.from(allAnswers).map((ans) => {
    return (
      <button
        key={nanoid()}
        className={`${
          quest.showCorrectAnswer
            ? (quest.selectedAnswer === quest.correct_answer &&
                quest.selectedAnswer === ans &&
                "correct--answer") ||
              (quest.selectedAnswer === ans && "incorrect--answer") ||
              (quest.correct_answer === ans && "correct--answer")
            : quest.selectedAnswer === ans && "selected--answer"
        }`}
        onClick={() => answersClick(quest.id, ans)}
        value={ans}
      >
        {decode(ans)}
      </button>
    );
  });

  return <div className="quiz--answers">{newAnswers}</div>;
}

export default Answers;
