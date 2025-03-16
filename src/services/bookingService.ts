import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Types for our booking data
export interface ActivityBooking {
  id?: string;
  activityName: string;
  date: Date;
  participants: number;
  provider?: string;
  specialRequirements?: string;
  status: string;
  timestamp: Date;
}

export interface HotelBooking {
  id?: string;
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  guests: number;
  specialRequests?: string;
  status: string;
  timestamp: Date;
}

// Save activity booking to Firestore
export const saveActivityBooking = async (booking: Omit<ActivityBooking, "id" | "timestamp" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, "activityBookings"), {
      ...booking,
      status: "confirmed",
      timestamp: new Date(),
    });
    console.log("Activity booking document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding activity booking document: ", error);
    throw error;
  }
};

// Save hotel booking to Firestore
export const saveHotelBooking = async (booking: Omit<HotelBooking, "id" | "timestamp" | "status">) => {
  try {
    const docRef = await addDoc(collection(db, "hotelBookings"), {
      ...booking,
      status: "confirmed",
      timestamp: new Date(),
    });
    console.log("Hotel booking document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding hotel booking document: ", error);
    throw error;
  }
};

