import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  } else if (user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
