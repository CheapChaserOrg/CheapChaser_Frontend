export type UserType = 'traveler' | 'guide' | 'provider';

export interface BaseProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  contactDetails?: {
    email: string;
    phone?: string;
    address?: string;
  };
  reviews: Review[];
  createdAt: Date;
}

export interface TravelerProfile extends BaseProfile {
  preferences: {
    budget: 'budget' | 'mid-range' | 'luxury';
    travelStyle: string[];
    interests: string[];
  };
  trips: Trip[];
  wishlist: WishlistItem[];
  bookings: Booking[];
  budgetTracking: BudgetEntry[];
}

export interface GuideProfile extends BaseProfile {
  languages: any;
  specialization: string;
  experience: number;
  certifications: Certification[];
  specialties: string[];
  availability: AvailabilitySlot[];
  assignedTrips: Trip[];
  earnings: Transaction[];
}

export interface ProviderProfile extends BaseProfile {
  businessInfo: {
    businessName: string;
    type: 'hotel' | 'homestay' | 'activity';
    location: string;
    description: string;
  };
  services: Service[];
  availability: AvailabilitySlot[];
  gallery: GalleryItem[];
  promotions: Promotion[];
  earnings: Transaction[];
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
}

interface Trip {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  status: 'planned' | 'ongoing' | 'completed';
}

interface WishlistItem {
  id: string;
  type: 'destination' | 'accommodation' | 'activity';
  name: string;
  addedAt: Date;
}

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'canceled';
  amount: number;
}

interface BudgetEntry {
  id: string;
  tripId: string;
  category: string;
  amount: number;
  date: Date;
}

interface Certification {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: Date;
  expiryDate?: Date;
  documentUrl?: string;
}

interface AvailabilitySlot {
  id: string;
  startDate: Date;
  endDate: Date;
  isBooked: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  availability: AvailabilitySlot[];
}

interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  type: 'image' | 'video';
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  code?: string;
}

interface Transaction {
  id: string;
  amount: number;
  date: Date;
  type: 'earning' | 'payout';
  status: 'pending' | 'completed';
  description: string;
}