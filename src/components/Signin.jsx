import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (email && password) {
      //sign in user with email and password

      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          console.log(cred);
          const user = cred.user;
          console.log(user);
          alert("You are logged in");
          //route to account page
          navigate("/account");
        })
        .catch((error) => {
          setError(error.message.toString());
          console.log(error.code);
        });
    } else {
      setError("Please fill out all fields");
    }
  };

  return (
    <div className="max-w-30 my-16 p-4 mx-auto">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in</h1>
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
