import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

import { NewRadioGroup } from "../headlessComp/NewRadioGroup";

const Signin = () => {
  const { signIn } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="max-w-30 my-16 p-4 mx-auto">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in</h1>
        <NewRadioGroup />
      </div>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="py-2 flex flex-col">
          <label className="py-2 font-medium" htmlFor="email">
            Email address
          </label>{" "}
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            required
            className="border p-3"
            type="email"
          />
        </div>

        <div className="py-2 flex flex-col">
          <label className="py-2 font-medium" htmlFor="password">
            Password
          </label>{" "}
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="border p-3"
            type="password"
          />
        </div>
        <button
          className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white"
          type="submit"
          onClick={handleSubmit}
        >
          <Link to="/account" className="underline">
            Sign in
          </Link>
        </button>
      </form>

      <p className="py-2">
        Don't have an account yet?{" "}
        <Link to="/signup" className="underline">
          Sign up.
        </Link>
      </p>
    </div>
  );
};

export default Signin;
