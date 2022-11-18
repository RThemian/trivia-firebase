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
    <div className="card items-center">
      {question && (
        <>
          <div className="card w-50 bg-primary text-primary-content justify-center items-center">
            <div className="card-body">
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

{
  /* answers.map((answer) => {
              return (
                <>
                  <button
                    className="btn btn-1 wrap"
                    style={{
                      backgroundColor:
                        selectedAnswer === answer ? "#FF6150" : "",
                    }}
                    onClick={() => onSelectAnswer(answer)}
                  >
                    {removeSpecChar(answer)}
                  </button> */
}
{
  /* <br /> */
}
{
  /* <br /> */
}

// </>

/*
const Question = ({ questions }) => {
  console.log(questions);
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

  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  //console.log("QUESTIONS", questions[0].question)

  const finishQuiz = () => {};

  const nextQuestion = () => {
    if (questions[currQuestion].correct_answer === optionChosen) {
      setScore(score + 1);
    }

    setCurrQuestion((currQuestion) => currQuestion + 1);
    setAnswerArr([
      removeSpecChar(questions[currQuestion].incorrect_answers[0]),
      removeSpecChar(questions[currQuestion].incorrect_answers[1]),
      removeSpecChar(questions[currQuestion].incorrect_answers[2]),
      removeSpecChar(questions[currQuestion].correct_answer)
    ]);
    setFinalRandArr([...RandomizeArray(answerArr)]);
  };

  const previousQuestion = () => {
    setCurrQuestion((currQuestion) => currQuestion - 1);
  };

  const [answerArr, setAnswerArr] = useState([
    removeSpecChar(questions[currQuestion].incorrect_answers[0]),
    removeSpecChar(questions[currQuestion].incorrect_answers[1]),
    removeSpecChar(questions[currQuestion].incorrect_answers[2]),
    removeSpecChar(questions[currQuestion].correct_answer)
  ]);

  // make answer array with three incorrects and last one correct

  //  let answerArr = [removeSpecChar(questions[currQuestion].incorrect_answers[0]), removeSpecChar(questions[currQuestion].incorrect_answers[1]), removeSpecChar(questions[currQuestion].incorrect_answers[2]), removeSpecChar(questions[currQuestion].correct_answer)];

  console.log("this is the NON random array", answerArr);

  //take array of values and randomly change its indices

  const RandomizeArray = (arr1) => {
    let ctr = arr1.length,
      temp,
      index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arr1[ctr];
      arr1[ctr] = arr1[index];
      arr1[index] = temp;
    }

    return arr1;
  };
  const [finalRandArr, setFinalRandArr] = useState([
    ...RandomizeArray(answerArr)
  ]);

  //  let finalRandArr = RandomizeArray(answerArr)

  //fill a const variable by randomizing the answerArr
  //THIS IS WHERE I THINK THE PROBLEM IS

  console.log("optionChosen", optionChosen);

  return (
    <div className="quiz">
      <h1>Question {currQuestion + 1}</h1>
      <h2> {removeSpecChar(questions[currQuestion].question)}</h2>
      <div className="options">
        <button id="btn" onClick={() => setOptionChosen(finalRandArr[0])}>
          {finalRandArr[0]}
        </button>{" "}
        <button
          id="btn"
          onClick={() => {
            setOptionChosen(finalRandArr[1]);
          }}
        >
          {finalRandArr[1]}
        </button>{" "}
        <button id="btn" onClick={() => setOptionChosen(finalRandArr[2])}>
          {finalRandArr[2]}{" "}
        </button>{" "}
        <button id="btn" onClick={() => setOptionChosen(finalRandArr[3])}>
          {finalRandArr[3]}{" "}
        </button>
        {currQuestion === questions.length - 1 ? (
          <button onClick={finishQuiz}>Finish Quiz</button>
        ) : (
          <button onClick={nextQuestion}>Next Question</button>
        )}
        {currQuestion > 0 ? (
          <button onClick={previousQuestion}>Previous Question</button>
        ) : (
          ""
        )}
      </div>
      <div>
        <h3>
          This is the random array{" "}
          {answerArr.length > 0
            ? RandomizeArray(answerArr).map((option) => <li>{option}</li>)
            : ""}
        </h3>
      </div>
    </div>
  );
};
*/

export default Question;
