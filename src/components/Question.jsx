import React from "react";
import { NewRadioGroup } from "./../headlessComp/NewRadioGroup";

const Question = ({ difficultyLevel, question, answers = [] }) => {
  // getSelected = (selected) => {
  //   console.log("selected", selected);
  // };

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
    <div className="card items-center m-0">
      {question && (
        <>
          <div className="card w-50 bg-primary text-primary-content justify-center items-center">
            <div className="card-body m-0">
              <h1 className="text-4xl">{removeSpecChar(question)}</h1>

              <h2>
                Difficulty Level:{" "}
                <span style={{ color: "#FF6150" }}>
                  {difficultyLevel.toUpperCase()}
                </span>{" "}
              </h2>
            </div>
          </div>
          {answers && answers.length && (
            <NewRadioGroup removeSpecChar={removeSpecChar} answers={answers} />
          )}
        </>
      )}
    </div>
  );
};

export default Question;
