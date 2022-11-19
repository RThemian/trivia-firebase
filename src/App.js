import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import "./index.css";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import EndScreen from "./pages/EndScreen";
import { AuthContextProvider } from "./components/AuthContext";

function App() {
  return (
    <div className="container mx-auto rounded-xl shadow border p-8 m-10">
      <h1 className="text-center text-blancaPeak-200 text-3xl font-bold mt-10 ">
        Quiz App with React, Firebase, and Tailwind CSS
      </h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/endscreen" element={<EndScreen />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
