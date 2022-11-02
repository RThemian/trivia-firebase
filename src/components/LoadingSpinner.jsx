import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  //show loading spinner for 3 seconds and show message "Nothing to see here"
  setTimeout(() => {
    alert("Nothing to see here");
  }, 3000);

  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
