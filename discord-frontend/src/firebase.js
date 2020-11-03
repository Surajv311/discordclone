import firebase from "firebase";

const firebaseConfig = {
  // your firebase config once you create your firebase webapp
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
