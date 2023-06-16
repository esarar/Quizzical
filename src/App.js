import React from "react";
import quizData from "./components/quizData";
import Questions from "./components/Questions";
import Answers from "./components/Answers";
import Options from "./components/Options";
import axios from "axios";
import { nanoid } from "nanoid";

function App() {
  const [questions, setQuestions] = React.useState("");
  const [start, setStart] = React.useState(false);
  const [newGame, setNewGame] = React.useState(false);
  const [chooseOptions, setSetChooseOptions] = React.useState(false);
  const [errorHandle, setErrorHandle] = React.useState(false);
  const [categoryData, setCategoryData] = React.useState("");
  const [getData, setGetData] = React.useState({
    category: "",
    difficulty: "",
    type: "",
  });

  function settingQuiz() {
    quizData(getData).then((question) => {
      if (question.length === 0) {
        setErrorHandle(true);
        setStart(false);
        return;
      } else {
        setErrorHandle(false);
      }
      return setQuestions(
        question.map((quest) => {
          return {
            ...quest,
            id: nanoid(),
            selectedAnswer: null,
            showCorrectAnswer: false,
          };
        })
      );
    });
  }

  React.useEffect(() => {
    async function categoryData() {
      await axios.get("https://opentdb.com/api_category.php").then((resp) => {
        const allCategoryData = resp.data.trivia_categories;

        setCategoryData(allCategoryData);
      });
    }
    categoryData();
  }, []);

  React.useEffect(() => {
    settingQuiz();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const allIsAnswered = () => {
      const isAnswered = Array.from(questions).every(
        (quest) => quest.selectedAnswer !== ""
      );

      if (!isAnswered) {
        setNewGame(false);
      } else if (isAnswered) {
        setNewGame((prevGame) => !prevGame);
      }
    };
    allIsAnswered();
  }, [questions]);

  function handleStartClick() {
    setStart((prevGame) => {
      return errorHandle ? prevGame : !prevGame;
    });
    settingQuiz();
  }

  function generateNewQuestions() {
    settingQuiz();
  }

  function mainMenuButton() {
    setStart(false);
  }

  function chooseOptionsButton() {
    setSetChooseOptions(true);
  }

  function answersClick(answerID, answer) {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((quest) => {
        return quest.id === answerID
          ? {
              ...quest,
              selectedAnswer: answer,
            }
          : quest;
      });
    });
  }

  function showAnswerClick() {
    if (!newGame) {
      alert("Please answer all of the questions!");
    } else if (newGame) {
      setQuestions(
        questions.map((quest) => {
          return {
            ...quest,
            showCorrectAnswer: !quest.showCorrectAnswer,
          };
        })
      );
    }
  }

  function handleOptionButton(event) {
    const { value, name } = event.target;
    setGetData((prevOptions) => {
      return {
        ...prevOptions,
        [name]: value,
      };
    });
  }

  const quizComponents = Array.from(questions).map((quest) => {
    return (
      <div key={quest.id}>
        <Questions quest={quest} id={quest.id} />
        <Answers answersClick={answersClick} quest={quest} id={quest.id} />
      </div>
    );
  });

  const isShow = Array.from(questions).every(
    (quest) => quest.showCorrectAnswer
  );

  return (
    <main>
      {start ? (
        <section className="quiz--page">
          {quizComponents}
          <div className="button--container">
            {!isShow && newGame && (
              <button className="showanswer--button" onClick={showAnswerClick}>
                FINISH
              </button>
            )}
            {isShow && (
              <button
                className="newquiz--button"
                onClick={generateNewQuestions}
              >
                NEW QUIZ
              </button>
            )}

            {isShow && (
              <button className="menu--button" onClick={mainMenuButton}>
                Main Menu
              </button>
            )}
          </div>
        </section>
      ) : (
        <div className="container">
          <div className="quiz--container">
            <h1 className="quiz--title">Quizzical</h1>
            {errorHandle && (
              <h2 className="error-text">
                Oops! We couldn't find any questions with these options!
              </h2>
            )}
            <p className="quiz--introduction">
              Welcome to Quizzical. If you want more spesific questions, please
              choose options.
            </p>

            {chooseOptions && (
              <Options
                key={getData.id}
                id={categoryData.id}
                categoryData={categoryData}
                getData={getData}
                isSelected={handleOptionButton}
              />
            )}
            <div className="quiz--buttons">
              {" "}
              {!chooseOptions && (
                <button
                  className="options--button"
                  onClick={chooseOptionsButton}
                >
                  Choose Options
                </button>
              )}
              <button className="start--button" onClick={handleStartClick}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
