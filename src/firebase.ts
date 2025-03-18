// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBWTJYBHHRlSZ2colOfGKfhanyP1hw1gTE",
  authDomain: "cheap-chaser-218a7.firebaseapp.com",
  projectId: "cheap-chaser-218a7",
  storageBucket: "cheap-chaser-218a7.appspot.com",
  messagingSenderId: "783602686185",
  appId: "1:783602686185:web:02deb76c8beb711c55f878",
  measurementId: "G-EQFM4066QJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Authentication
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider
export const db = getFirestore(app); // Firestore