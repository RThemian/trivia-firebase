import React from "react";
//import "./Question.css";

const Question = ({
  difficultyLevel,
  question,
  answers = [],
  selectedAnswer = "",
  onSelectAnswer,
}) => {
  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    setChecked((checked) => !checked);
  };

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
                  {/*create button highlighted on click */}
                  <button
                    className={`answer-btn ${
                      selectedAnswer === answer ? "selected" : ""
                    }`}
                    onClick={() => onSelectAnswer(answer)}
                  ></button>

                  <button
                    id="btn"
                    className="focus:outline focus:ring focus:ring-yellow-500 border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white font-bold"
                    style={{
                      bg: selectedAnswer === answer ? "#FF6150" : "",
                    }}
                    onClick={() => onSelectAnswer(answer)}
                  >
                    {/*create checkbox input that checks on click */}
                    <input
                      type="checkbox"
                      checked={checked}
                      onClick={handleCheck}
                    />{" "}
                    {removeSpecChar(answer)}
                  </button>
                  <br />
                  <br />
                </>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Question;
