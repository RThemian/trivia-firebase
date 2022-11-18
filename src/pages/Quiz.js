//get trivia questions from api
import { UserAuth } from "../components/AuthContext";
import React, { useState, useEffect } from "react";
import Question from "./../components/Question";
import axios from "axios";

//put the randomizeArray function outside of the main component to controll its use

function randomizeArray(array) {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const Quiz = ({ pointsPossible = 0, setPointsPossible }) => {
  const { selected, setSelected } = UserAuth();

  const difficultyLevels = [
    { value: "easy" },
    { value: "medium" },
    { value: "hard" },
  ];
  const [score, setScore] = useState(0);
  const [diffSelect, setDiffSelect] = useState(difficultyLevels[0].value);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionAmount, setQuestionAmount] = useState(3);
  //const [selected, setSelected] = useState(null);

  //const [score, setScore] = useState(0);

  const loadQuestions = (e) => {
    e.preventDefault();
    setDiffSelect(document.querySelector("#difficulty").value);
    console.log(
      "question query selector",
      document.querySelector("#questionAmount").value
    );

    return axios

      .get(
        `https://opentdb.com/api.php?amount=${questionAmount}&difficulty=${diffSelect}&type=multiple`
      )
      .then((response) => {
        // handle success
        //response.json()

        console.log("questions?", response.data.results);
        const questions = response.data.results.map((q) => {
          return {
            // add "selectedAnswer" prop to each question

            selectedAnswer: null,
            // add "answers" prop to randomize answers up front
            answers: randomizeArray([...q.incorrect_answers, q.correct_answer]),

            // add "correctAnswer" prop to each question
            correctAnswer: q.correct_answer,
            // add "question" prop to each question
            question: q.question,
          };
        });
        setQuestions(questions);
        setDiffSelect(document.getElementById("#difficulty").value);
        setPointsPossible(questions.length);
        setCurrentQuestionIndex(0);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .finally(() => {});
  };

  const handleAnswer = (answer) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].selectedAnswer = answer;

    setQuestions(newQuestions);
  };

  const handleNextQuestion = () => {
    console.log("current question index", currentQuestionIndex);
    console.log(
      "questions index",
      questions[currentQuestionIndex].correctAnswer
    );
    console.log(
      "selected answer",
      questions[currentQuestionIndex].selectedAnswer,
      selected
    );

    //callback function that returns selected from NewRadioGroup

    const newScore =
      questions[currentQuestionIndex].correctAnswer === selected
        ? score + 1
        : score;

    setScore(newScore);
    alert("score", score, newScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const getSelected = (selected) => {
    console.log("selected", selected);
    setSelected(selected);
  };

  return (
    <div className="card bg-secondary text-primary-content">
      <div className="card-body"></div>

      {currentQuestionIndex < questions.length ? (
        <div className="m-4 content-center ">
          <Question
            getSelected={getSelected}
            question={questions[currentQuestionIndex].question}
            answers={questions[currentQuestionIndex].answers}
            selectedAnswer={questions[currentQuestionIndex].selectedAnswer}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            currentQuestionIndex={currentQuestionIndex}
            questionAmount={questionAmount}
            difficultyLevel={diffSelect}
          />
          <div className="flex flex-row justify-center items-center">
            <button
              onClick={handleNextQuestion}
              id="nextbutton"
              className="m-4 btn btn-success text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            >
              Next Question
            </button>
            <button
              disabled={currentQuestionIndex === 0}
              onClick={handlePreviousQuestion}
              id="prevbutton"
              className="text-white m-4 btn btn-warning btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            >
              Prev Question
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz__end">
          <h2 className="quiz__end__title">Quiz Complete</h2>
          <div className="quiz__end__score">Score: {score}</div>
          <button className="quiz__end__restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
      {questions.length < 1 && ( //if there are no questions, show the form
        <div className="rounded-md m-4 p-4 flex-row bg-blue-500">
          <form className="text-2xl mx-2 px-3" onSubmit={loadQuestions}>
            <label htmlFor="difficulty" className="m-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              className="text-base text-red-400 p-2 rounded-md"
            >
              {difficultyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value}
                </option>
              ))}
            </select>
            <label htmlFor="questionAmount" className="m-2">
              Number of Questions
            </label>
            <select
              id="questionAmount"
              name="questionAmount"
              className="text-red-400 p-2 rounded-md"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <div className="items-center">
              <button
                className="m-4 btn btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                type="submit"
              >
                Start Quiz
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Quiz;

// randomize answers and add to questions state
// set current question index to 0
//toggle through questions one at a time
//show score at end
