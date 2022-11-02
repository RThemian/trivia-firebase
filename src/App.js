import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import React from "react";
import "./index.css";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h1 className="text-center text-3xl font-bold mt-10 ">
        Quiz App with React, Firebase, and Tailwind CSS
      </h1>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
