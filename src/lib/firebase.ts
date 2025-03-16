// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6nSg9PW0yqKuRpa2b2PiUx6EDTTppjhg",
  authDomain: "cheapchaser-fc687.firebaseapp.com",
  projectId: "cheapchaser-fc687",
  storageBucket: "cheapchaser-fc687.appspot.com",
  messagingSenderId: "355602095885",
  appId: "1:355602095885:web:d6423c2f681906874dda44",
  measurementId: "G-L1N6BD5FK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);