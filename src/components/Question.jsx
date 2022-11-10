import React from "react";
import "./Question.css";

const Question = ({
  difficultyLevel,
  question,
  answers = [],
  selectedAnswer = "",
  onSelectAnswer,
}) => {
  const removeSpecChar = (props) => {
    let result = props
      .replace(/&quot;/g, "''")
      .replace(/&#039;/g, "'")
      .replace(/&shy;/g, "-")
      .replace(/&amp;/g, "&")
      .replace(/&Iacute;/g, "í")
      .replace(/&uuml;/g, "ü")
      .replace(/&rsquo;/g, "’")
      .replace(/&eacute;/g, "é")
      .replace(/&Uuml;/g, "Ü");

    return result;
  };

  return (
    <div>
      {question && (
        <>
          <h1>{removeSpecChar(question)}</h1>
          <h5>
            Difficulty Level:{" "}
            <span style={{ color: "#FF6150" }}>{difficultyLevel}</span>{" "}
          </h5>
          {answers &&
            answers.length &&
            answers.map((answer) => {
              return (
                <>
                  <button
                    className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white focus:outline-none focus:ring focus:ring-yellow-500"
                    style={{
                      bg: selectedAnswer === answer ? "#FF6150" : "",
                    }}
                    onClick={() => onSelectAnswer(answer)}
                  >
                    {removeSpecChar(answer)}
                  </button>
                  <br />
                  <br />
                </>
              );
            })}
          <button
            onClick={() => onSelectAnswer("next")}
            className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white focus:outline-none focus:ring focus:ring-yellow-500"
          >
            Next
          </button>
          <button
            onClick={() => onSelectAnswer("next")}
            className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white focus:outline-none focus:ring focus:ring-yellow-500"
          >
            Previous
          </button>
        </>
      )}
    </div>
  );
};

export default Question;
