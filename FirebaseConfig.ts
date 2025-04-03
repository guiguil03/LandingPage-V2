// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXs5v4q3Oq4P145jC-dqCMcPqegN_MFsk",
  authDomain: "unify-18c4f.firebaseapp.com",
  projectId: "unify-18c4f",
  storageBucket: "unify-18c4f.firebasestorage.app",
  messagingSenderId: "706227473339",
  appId: "1:706227473339:web:20081a7ab1e1832c4f929e",
  measurementId: "G-L9EVVTHDQH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const app_auth = initializeAuth(app);
export const app_db = getFirestore(app);
