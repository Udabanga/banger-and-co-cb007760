import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZok4612rmjXWUQz3b3RaCem-IepO5jNM",
  authDomain: "banger-and-co-88dea.firebaseapp.com",
  databaseURL: "https://banger-and-co-88dea.firebaseio.com",
  projectId: "banger-and-co-88dea",
  storageBucket: "banger-and-co-88dea.appspot.com",
  messagingSenderId: "499071687746",
  appId: "1:499071687746:web:f52fa7b0d68570cd89e1db",
  measurementId: "G-9R4LDBWLNY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth()
export const auth = firebase.auth();
