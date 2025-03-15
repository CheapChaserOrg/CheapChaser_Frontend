// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  GoogleAuthProvider } from "firebase/auth";

// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWTJYBHHRlSZ2colOfGKfhanyP1hw1gTE",
    authDomain: "cheap-chaser-218a7.firebaseapp.com",
    projectId: "cheap-chaser-218a7",
    storageBucket: "cheap-chaser-218a7.appspot.com",
    messagingSenderId: "783602686185",
    appId: "1:783602686185:web:02deb76c8beb711c55f878",
    measurementId: "G-EQFM4066QJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
