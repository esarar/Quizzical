import axios from "axios";

const quizData = async (getData) => {
  const { type, category, difficulty } = getData;

  let typeChoice = "";
  let categoryChoice = "";
  let difficultyChoice = "";

  if (category !== "") {
    categoryChoice = `&category=${category}`;
  }

  if (difficulty !== "") {
    difficultyChoice = `&difficulty=${difficulty}`;
  }
  if (type !== "") {
    typeChoice = `&type=${type}`;
  }
  const url = `https://opentdb.com/api.php?amount=5${categoryChoice}${difficultyChoice}${typeChoice}`;

  return await axios.get(url).then((response) => {
    return response.data.results;
  });
};

export default quizData;
