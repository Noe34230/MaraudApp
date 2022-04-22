// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOPJNSgU1zXbWNKxmjdcrbvnHQEWrPg0U",
  authDomain: "maraudapp.firebaseapp.com",
  projectId: "maraudapp",
  storageBucket: "maraudapp.appspot.com",
  messagingSenderId: "457958550452",
  appId: "1:457958550452:web:2aa12118f881dadc6aa0e1",
  measurementId: "G-VGQLB4HFG0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const colRef = collection(db, "Maraudes");

export const authentication = getAuth(app);
onAuthStateChanged(authentication, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
  }
});
