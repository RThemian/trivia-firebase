import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import LoadingSpinner from "./LoadingSpinner";

const Account = () => {
  //match logged in user to user in firestore and return display name
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  let navigate = useNavigate();
  //get date and time
  const date = new Date();

  const [user, setUser] = React.useState(null);
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
  const date_time_log = date.toLocaleString();
  console.log("DATE TIME LOG", date_time_log);
  //create a new document in firestore collection date_time_log using date_time_log string and user email
  React.useEffect(() => {
    const addDateTimeLog = async () => {
      const docRef = await db
        .collection("date_time_log")
        .doc(date_time_log)
        .set({
          email: email,
        });
    };
  }, [email]);

  return (
    <>
      <div
        datatheme="lemonade"
        className="max-w-[600px] mx-auto my-16 p-4 flex flex-row ml-4"
      >
        <div className="col-span-2 p-4">
          <h1 className="text-2xl font-bold py-4">Account</h1>
          {displayName && email ? (
            <div>
              <h3 className="py-2">User: {displayName}</h3>
              <h3 className="py-2">Email: {email}</h3>
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
        <div className="col-span-2 p-4">
          <h1 className="text-2xl font-bold py-4">Play the next Quiz:</h1>
          {/* make a button that routes to /quiz */}
          <Link to="/quiz">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Play
            </button>
          </Link>
        </div>
      </div>
      {/* display table of all documents from collection date_time_log from firestore */}

      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-primary"
          //old className = border border-blue-500 px-6 py-2 my-4
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Account;
