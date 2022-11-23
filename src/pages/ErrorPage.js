import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-16 text-center">
        404 Not Found or you need to be logged in
      </h1>
      <button
        onClick={navigate("/")}
        className="btn bg-hawkTurquoise-600 hover:bg-hawkTurquoise-800 text-blancaPeak-200 center border-accent-focus w-28 "
      >
        Return to Signin
      </button>
    </div>
  );
};

export default ErrorPage;
