import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  //show loading spinner for 3 seconds and show message "Nothing to see here"

  let status = (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );

  // const [counter, setCounter] = React.useState(0);
  // setTimeout(() => {
  //   setCounter(counter + 1);
  // }, 1000);

  // if (counter >= 10) {
  //   status = <h3>Nothing to see here</h3>;
  // }

  return status;
}
