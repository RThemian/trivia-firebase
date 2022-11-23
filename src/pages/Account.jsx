import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
//import auth db from ./firebase.js
import { auth, db } from "./../components/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import LoadingSpinner from "./../components/LoadingSpinner";
import { UserAuth } from "./../components/AuthContext";

const Account = () => {
  //match logged in user to user in firestore and return display name
  const { user, logout } = UserAuth();
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  //get date and time

  const date = new Date();

  //get user logged in and display name

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("USER", user);
      //get display name from firestore matching email
      const usersRef = collection(db, "users");

      // Create a query against the collection.
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      console.log("QUERY", usersQuery);

      if (usersQuery) {
        const users = await getDocs(usersQuery);
        console.log("USERS", users);
        users.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setDisplayName(doc.data().displayName);
        });
        setEmail(user.email);
      }
      // ...
    } else {
      // User is signed out
      //if user is not logged in, redirect to signin page
      navigate("/");
      // ...
    }
  });

  //create a query for scores collection that match user email
  const scoresQuery = query(
    collection(db, "scores"),
    where("email", "==", email)
  );
  console.log("SCORES QUERY", scoresQuery);

  //get scores from firestore
  const [scores, setScores] = React.useState([]);
  React.useEffect(() => {
    const getScores = async () => {
      const scoresQuery = query(
        collection(db, "scores"),
        where("email", "==", email)
      );
      const scoresSnapshot = await getDocs(scoresQuery);
      const scoresList = scoresSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setScores(scoresList);
    };
    getScores();
  }, [email]);
  //create a date and time string every time user email is used and create firestore collection date_time_log

  return (
    <>
      <div className="max-w-[900px] my-16 p-4 flex flex-row mx-auto">
        <div className="col-span-2 p-4">
          <h1 className="text-2xl font-bold py-4">Account</h1>
          {email || user ? (
            <div>
              {displayName ? (
                <h3 className="py-2">User Name: {displayName}</h3>
              ) : null}
              <h3 className="py-2">Email: {email}</h3>
              <h3 className="py-2">User Login: {user.email}</h3>
              {/* display date with commas */}
              <h3 className="py-2">
                Date:{" "}
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              {/* display time separately from date */}
              <h3 className="py-2">Time: {date.toLocaleTimeString()} </h3>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {/* display scores in a column alongside user */}

        <div className="col-span-2 p-4">
          <h1 className="text-2xl font-bold py-4">Scores</h1>
          {scores.length > 0 ? (
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Score</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr
                    key={score.id}
                    className={
                      score.score >= 8
                        ? "bg-hawkTurquoise-50"
                        : score.score >= 6
                        ? "bg-clearPurple-100"
                        : "bg-japaneseCoral-800"
                    }
                  >
                    <td className="border px-4 py-2">{score.score}</td>
                    <td className="border px-4 py-2">{score.date}</td>

                    <td className="border px-4 py-2">{score.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>No scores yet</h3>
          )}
        </div>
        <div className="col-lg-6 w-full p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold py-4 w-full px-11">
            Play the next Quiz:
          </h1>
          {/* make a button that routes to /quiz */}
          <Link to="/quiz" className="flex flex-col items-center p-16">
            <button className="bg-hawkTurquoise-500 btn btn-wide align-middle content-center hover:bg-hawkTurquoise-700 text-blancaPeak-100 font-bold py-2 px-4 rounded">
              Play
            </button>
          </Link>
        </div>
      </div>
      {/* display table of all documents from collection date_time_log from firestore */}

      <div>
        <button
          onClick={handleLogout}
          className="border border-blue-500 px-6 py-2 my-4"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Account;
