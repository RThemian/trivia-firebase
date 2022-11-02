import React from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner.jsx";

const Account = () => {
  //match logged in user to user in firestore and return user name
  const [userName, setuserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  let navigate = useNavigate();
  //get date and time
  const date = new Date();

  const [user, setUser] = React.useState(null);
  //get user logged in and user name

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("USER", user);
      //get user name from firestore matching email
      const usersRef = collection(db, "users");

      // Create a query against the collection.
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );

      console.log("QUERY", usersQuery);

      if (usersQuery) {
        const users = await getDocs(usersQuery);
        users.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setuserName(doc.data().userName);
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

  return (
    <>
      <div className="max-w-[600px] mx-auto my-16 p-4 row">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold py-4">Account</h1>
          {userName && email ? (
            <div>
              <h3 className="py-2">User: {userName}</h3>
              <h3 className="py-2">Email: {email}</h3>
              {/* user date with commas */}
              <h3 className="py-2">
                Date:{" "}
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              {/* user time separately from date */}
              <h3 className="py-2">Time: {date.toLocaleTimeString()} </h3>
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        {/* user scores in a column alongside user */}

        <div className="col-lg-2">
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
                        ? "bg-green-200"
                        : score.score >= 6
                        ? "bg-yellow-200"
                        : "bg-red-200"
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
      </div>

      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="border border-blue-500 px-6 py-2 my-4"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Account;
