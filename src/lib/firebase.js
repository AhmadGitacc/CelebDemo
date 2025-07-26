// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYgTNyzNICXB0OGqhePr9-ZdxuC07yYNU",
  authDomain: "celeb-demo.firebaseapp.com",
  projectId: "celeb-demo",
  storageBucket: "celeb-demo.firebasestorage.app",
  messagingSenderId: "715184408711",
  appId: "1:715184408711:web:ddcf61939a6750da285022"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);