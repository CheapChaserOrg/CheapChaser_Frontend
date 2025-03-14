
import { z } from "zod";

// Sub-schemas
const flightDetailsSchema = z.object({
  flightNumber: z.string().optional(),
  airline: z.string().optional(),
  departureAirport: z.string().optional(),
  arrivalAirport: z.string().optional(),
  flightDate: z.date().optional(),
  flightTime: z.string().optional(),
});

const airportPickupSchema = z.object({
  needPickup: z.boolean().default(false),
  additionalNotes: z.string().optional(),
});

// Define the exact string literals for accommodation special needs
const specialNeedsEnum = z.enum([
  "Sea view",
  "Jungle stay",
  "Camping",
  "Villa",
  "Cultural stay"
]);

const accommodationPreferencesSchema = z.object({
  budgetRange: z.enum([
    "Budget (Under $50/night)",
    "Mid-range ($50-150/night)",
    "Luxury ($150-300/night)",
    "Ultra Luxury ($300+/night)"
  ]),
  budgetAmount: z.number().positive().optional(),
  accommodationType: z.enum([
    "Hotel",
    "Resort",
    "Guesthouse",
    "Homestay",
    "Villa",
    "Apartment",
    "Eco Lodge",
    "Boutique Hotel"
  ]),
  specialNeeds: z.array(specialNeedsEnum).optional(),
});

// Define exact string literals for travel styles
const travelStyleEnum = z.enum([
  "Adventure & Nature",
  "Cultural & Historical",
  "Relaxation & Leisure",
  "Food & Cultural Experiences"
]);

// Define exact string literals for activities
const activityEnum = z.enum([
  "Trekking",
  "Surfing",
  "Safari",
  "Scuba Diving",
  "Temple Visits",
  "Heritage Tours",
  "Village Experiences",
  "Beach Stays",
  "Ayurveda & Spa",
  "Waterfall Visits", 
  "Food Tours",
  "Tea Plantation Visits",
  "Cooking Classes"
]);

// Define exact string literals for districts
const districtEnum = z.enum([
  "Galle",
  "Matara",
  "Hambantota"
]);

// Main travel form schema
export const travelFormSchema = z.object({
  // Basic travel details
  travelType: z.enum(["Solo", "Couple", "Group"]),
  groupSize: z.number().positive().optional().nullable(),
  groupType: z.enum([
    "Family Trip",
    "Friends' Trip",
    "Corporate Retreat",
    "School/University Trip"
  ]).optional().nullable(),
  hasChildrenOrElderly: z.boolean().optional().nullable(),
  purchaseForGroup: z.boolean().optional().nullable(),
  
  // Dates and duration
  arrivalDate: z.date({
    required_error: "Arrival date is required",
  }),
  departureDate: z.date({
    required_error: "Departure date is required",
  }),
  
  // Flight info
  flightDetails: flightDetailsSchema.optional(),
  airportPickup: airportPickupSchema,
  
  // Preferences
  accommodationPreferences: accommodationPreferencesSchema,
  transportMode: z.enum([
    "Private Car with Driver (1-4 people)",
    "Self-Drive (Rental Car, Scooter) (1-2 people)",
    "Public Transport (Bus, Train, Tuk-tuk) (Varies)",
    "Luxury Tour Bus or Chauffeur Service (10-50 people)",
    "Shared Taxi or Ride-Sharing (1-4 people)",
    "Bicycle or E-Bike (1 person)",
    "Motorbike Rental (1-2 people)",
    "Campervan or RV (2-6 people)",
    "Boat or Ferry (Varies)"
  ]),
  
  // Travel styles and activities
  travelStyles: z.array(travelStyleEnum).nonempty({ message: "Select at least one travel style" }),
  
  activities: z.array(activityEnum).nonempty({ message: "Select at least one activity" }),
  
  // Destination info
  selectedDistricts: z.array(districtEnum).nonempty({ message: "Select at least one district" }),
  
  selectedPlaces: z.record(z.string(), z.array(z.string())).optional(),
  
  // Additional requests
  specialRequests: z.string().optional(),
}).refine((data) => {
  // Check that departure date is after arrival date
  if (data.arrivalDate && data.departureDate) {
    return data.departureDate > data.arrivalDate;
  }
  return true;
}, {
  message: "Departure date must be after arrival date",
  path: ["departureDate"],
});

// Export type helpers
export type TravelFormValues = z.infer<typeof travelFormSchema>;
export type SpecialNeedsType = z.infer<typeof specialNeedsEnum>;
export type TravelStyleType = z.infer<typeof travelStyleEnum>;
export type ActivityType = z.infer<typeof activityEnum>;
export type DistrictType = z.infer<typeof districtEnum>;

export const defaultValues: Partial<TravelFormValues> = {
  travelType: "Solo",
  groupSize: null,
  groupType: null,
  hasChildrenOrElderly: false,
  purchaseForGroup: false,
  arrivalDate: undefined,
  departureDate: undefined,
  flightDetails: {
    flightNumber: "",
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    flightDate: undefined,
    flightTime: "",
  },
  airportPickup: {
    needPickup: false,
    additionalNotes: "",
  },
  accommodationPreferences: {
    budgetRange: "Mid-range ($50-150/night)",
    budgetAmount: 100,
    accommodationType: "Hotel",
    specialNeeds: [],
  },
  transportMode: "Private Car with Driver (1-4 people)",
  travelStyles: ["Adventure & Nature"],
  activities: ["Trekking"],
  selectedDistricts: ["Galle"],
  selectedPlaces: {},
  specialRequests: "",
};
