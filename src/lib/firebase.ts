import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6nSg9PW0yqKuRpa2b2PiUx6EDTTppjhg",
  authDomain: "cheapchaser-fc687.firebaseapp.com",
  projectId: "cheapchaser-fc687",
  storageBucket: "cheapchaser-fc687.firebasestorage.app",
  messagingSenderId: "355602095885",
  appId: "1:355602095885:web:d6423c2f681906874dda44",
  measurementId: "G-L1N6BD5FK4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };