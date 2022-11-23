import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../components/AuthContext";

const EndScreen = () => {
  const { score, setScore } = UserAuth();
  const { questions, setQuestions } = UserAuth();
  const { currentQuestionIndex, setCurrentQuestionIndex } = UserAuth();
  const { questionAmount, setQuestionAmount } = UserAuth();

  let navigate = useNavigate();
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuestions([]);
    navigate("/quiz");
  };
  let percentScore = Number(score / questionAmount).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });

  return (
    <div>
      {" "}
      <div className="card w-100 bg-hawkTurquoise-800 text-neutral-content m-4">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-4xl">Quiz Complete!</h1>
          <h1 className="text-4xl">Percent Score: {percentScore}</h1>
          <div className="card-actions justify-end">
            <button className="btn btn-accent" onClick={handleRestart}>
              Play another round!
            </button>
            <button className="btn btn-ghost">I'm done log me out!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
