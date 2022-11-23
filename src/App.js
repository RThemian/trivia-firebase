import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import "./index.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import EndScreen from "./pages/EndScreen";
import { AuthContextProvider } from "./components/AuthContext";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="rounded-xl bg-japaneseCoral-100 shadow border">
      <header className="mt-2">
        <h4 className="text-center text-hawkTurquoise-800 text-3xl font-bold">
          Quiz App with React, Firebase, and Tailwind CSS
        </h4>
      </header>
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
          <Route path="/endscreen" element={<EndScreen />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
