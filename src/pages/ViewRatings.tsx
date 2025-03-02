ViewRatings.tsx


import { useState } from "react";

interface Rating {
  id: string;
  bookingId: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}
export default ViewRatings;