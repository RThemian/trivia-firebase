// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
//import get firestore
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfhbEcdv7q6k3rSbIUn_it2_yfy3tBAAQ",
  authDomain: "triviarandomapp.firebaseapp.com",
  projectId: "triviarandomapp",
  storageBucket: "triviarandomapp.appspot.com",
  messagingSenderId: "560167259113",
  appId: "1:560167259113:web:cce1d8a9608dc11e0b9978",
  measurementId: "G-S444D9LWLB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//export db to use in other files
const db = getFirestore(app);
//export auth to use in other files
const auth = getAuth(app);

//export db to use in other files and export auth to use in other files
export { db, auth };
