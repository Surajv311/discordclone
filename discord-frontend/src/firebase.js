import firebase from "firebase";

// your firebase config once you create your firebase webapp
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCmWOC86XTO4gpiehwq7F23g8D2k3oO8mE",
  authDomain: "mydiscordcloneapp.firebaseapp.com",
  databaseURL: "https://mydiscordcloneapp.firebaseio.com",
  projectId: "mydiscordcloneapp",
  storageBucket: "mydiscordcloneapp.appspot.com",
  messagingSenderId: "314106613102",
  appId: "1:314106613102:web:155cf672b56614a42f057f",
  measurementId: "G-9R9PNYQXYS",
};

// initialize app

const firebaseApp = firebase.initializeApp(firebaseConfig);

// this would access our firestore instance

const db = firebaseApp.firestore();

// authentication handler
const auth = firebase.auth();

// google for authentication provider
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
