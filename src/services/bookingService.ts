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

