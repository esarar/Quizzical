import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

function Answers({ quest, answersClick }) {
  const [allAnswers, setAllAnswers] = React.useState([]);

  const incorrectAnswer = Array.from(quest.incorrect_answers).map(
    (incorrect) => {
      return (
        <button
          key={nanoid()}
          className={`${
            quest.showCorrectAnswer
              ? quest.selectedAnswer === incorrect && "incorrect--answer"
              : quest.selectedAnswer === incorrect && "selected--answer"
          }`}
          onClick={() => answersClick(quest.id, incorrect)}
          value={incorrect}
        >
          {incorrect}
        </button>
      );
    }
  );

  const correctAnswer = (
    <button
      key={nanoid()}
      className={`${
        quest.showCorrectAnswer
          ? "correct--answer"
          : quest.selectedAnswer === quest.correct_answer && "selected--answer"
      }`}
      onClick={() => answersClick(quest.id, quest.correct_answer)}
      value={quest.correct_answer}
    >
      {quest.correct_answer}
    </button>
  );

  incorrectAnswer.push(correctAnswer);

  // Yates Shuffle
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * 0);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffle(incorrectAnswer);

  React.useEffect(() => {
    setAllAnswers(incorrectAnswer);
    // eslint-disable-next-line
  }, [quest]);

  return <div className="quiz--answers">{decode(allAnswers)}</div>;
}

export default Answers;
