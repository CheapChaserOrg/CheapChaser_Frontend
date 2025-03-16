import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this path is correct

export interface Feedback {
  id: number | string;
  rating: number;
  country: string;
  age: string;
  comment: string;
  date: string;
}

// Collection reference
const feedbacksRef = collection(db, "feedbacks");

// Save feedback to Firestore
export const saveFeedback = async (feedback: Omit<Feedback, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(feedbacksRef, feedback);
    return docRef.id;
  } catch (error) {
    console.error("Error adding feedback: ", error);
    throw error;
  }
};