//get trivia questions from api

import React, { useState, useEffect } from "react";
import Question from "./Question";
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
  const difficultyLevels = [
    { value: "easy" },
    { value: "medium" },
    { value: "hard" },
  ];
  const [score, setScore] = useState(0);
  const [diffSelect, setDiffSelect] = useState("easy");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionAmount, setQuestionAmount] = useState(3);
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
    const newScore =
      questions[currentQuestionIndex].correctAnswer ===
      questions[currentQuestionIndex].selectedAnswer
        ? score + 1
        : score;
    setScore(newScore);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div className="quiz">
      <div className="quiz__header">
        {/* style with tailwind for header bold font text center*/}
        <h1 className="text-center text-3xl font-bold mt-10 ">
          Choose your Quiz
        </h1>

        <div className="flex-row">Score: {score}</div>
      </div>

      {currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex].question}
          answers={questions[currentQuestionIndex].answers}
          selectedAnswer={questions[currentQuestionIndex].selectedAnswer}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          currentQuestionIndex={currentQuestionIndex}
          questionAmount={questionAmount}
        />
      ) : (
        <div className="flex-row">
          <h2 className="font-weight">Quiz Complete</h2>
          <div className="quiz__end__score">Score: {score}</div>
          <button className="quiz__end__restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
      {questions && (
        <div className="quiz__footer">
          <form className="quiz__footer__form" onSubmit={loadQuestions}>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty">
              {difficultyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.value}
                </option>
              ))}
            </select>
            <label htmlFor="questionAmount">Number of Questions</label>
            <select id="questionAmount" name="questionAmount">
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <button
              className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white"
              type="submit"
            >
              Start Quiz
            </button>
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
