// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBZG7KXEKahBZ4ewSIq8Uspyz2VEXlQNk",
  authDomain: "yaza-project.firebaseapp.com",
  projectId: "yaza-project",
  storageBucket: "yaza-project.firebasestorage.app",
  messagingSenderId: "282659105532",
  appId: "1:282659105532:web:797076dab52eb6d1b8c579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);