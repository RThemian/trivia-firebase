import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./../components/firebase";
import { UserAuth } from "./../components/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [error, setError] = React.useState(null);

  const { createUser } = UserAuth();

  let navigate = useNavigate();
  //handle submit to firebase and create user with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
    } catch (error) {
      setError("Failed to create an account", error, error.message);
    }
  };

  return (
    <div className="max-w-30 my-16 p-4 mx-auto">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign up for an account</h1>
        <h3>{auth.currentUser?.userName}</h3>
      </div>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="py-2 flex flex-col">
          <label className="py-2 font-medium" htmlFor="email">
            User Name
          </label>{" "}
          <input
            className="border border-gray-400 rounded p-2"
            type="text"
            name="userName"
            id="userName"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div className="py-2 flex flex-col">
          <label className="py-2 font-medium" htmlFor="email">
            Email address
          </label>{" "}
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          onClick={handleSubmit}
          className="underline border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white"
          type="submit"
        >
          Sign up
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>

      <p className="py-2">
        Already have an account?{" "}
        <Link to="/" className="underline">
          Sign in.
        </Link>
      </p>
    </div>
  );
};

export default Signup;
