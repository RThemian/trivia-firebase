import React from "react";

const EndScreen = () => {
  return (
    <>
      <div>EndScreen</div>;
      <div className="quiz__end">
        <h2 className="quiz__end__title">Quiz Complete</h2>
        <div className="quiz__end__score">Score:</div>
        <button className="btn btn-outline m-4 hover:bg-warning" onClick>
          Restart
        </button>
      </div>
    </>
  );
};

export default EndScreen;
