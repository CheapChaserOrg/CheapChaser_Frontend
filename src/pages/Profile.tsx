import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { TravelerProfile } from '../components/profile/TravelerProfile';
import { GuideProfile } from '../components/profile/GuideProfile';
import { ProviderProfile } from '../components/profile/ProviderProfile';
import { UserType } from '../types/profile';
import { useToast } from '../components/ui/use-toast';

// Temporary mock data - replace with actual data fetching
const mockTravelerData = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  bio: "Passionate traveler exploring Sri Lanka",
  profilePicture: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  reviews: [],
  createdAt: new Date(),
  preferences: {
    budget: "mid-range" as const,
    travelStyle: ["adventure", "cultural"],
    interests: ["hiking", "photography"],
  },
  trips: [
    {
      id: "1",
      destination: "Kandy",
      startDate: new Date("2024-03-15"),
      endDate: new Date("2024-03-20"),
      status: "planned" as const,
    },
  ],
  wishlist: [
    {
      id: "1",
      type: "destination" as const,
      name: "Sigiriya",
      addedAt: new Date(),
    },
  ],
  bookings: [],
  budgetTracking: [
    {
      id: "1",
      tripId: "1",
      category: "Accommodation",
      amount: 200,
      date: new Date(),
    },
  ],
};

const mockGuideData = {
  id: "2",
  name: "Sarah Smith",
  email: "sarah@example.com",
  bio: "Experienced guide with 5 years of experience",
  profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  reviews: [],
  createdAt: new Date(),
  experience: 5,
  certifications: [
    {
      id: "1",
      name: "Professional Tour Guide",
      issuedBy: "Sri Lanka Tourism Board",
      issuedDate: new Date("2020-01-01"),
      expiryDate: new Date("2025-01-01"),
    },
  ],
  specialties: ["Cultural Tours", "Wildlife Safari"],
  availability: [],
  assignedTrips: [
    {
      id: "1",
      destination: "Yala National Park",
      startDate: new Date("2024-03-25"),
      endDate: new Date("2024-03-27"),
      status: "planned" as const,
    },
  ],
  earnings: [
    {
      id: "1",
      amount: 150,
      date: new Date(),
      type: "earning" as const,
      status: "completed" as const,
      description: "Yala Safari Tour",
    },
  ],
};

const mockProviderData = {
  id: "3",
  name: "Beach Resort Ltd",
  email: "resort@example.com",
  bio: "Luxury beachfront resort",
  profilePicture: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
  reviews: [],
  createdAt: new Date(),
  businessInfo: {
    businessName: "Sunset Beach Resort",
    type: "hotel" as const,
    location: "Mirissa, Sri Lanka",
    description: "Luxury beachfront resort with spectacular views",
  },
  services: [
    {
      id: "1",
      name: "Deluxe Ocean View Room",
      description: "Spacious room with ocean view",
      price: 200,
      availability: [],
    },
  ],
  availability: [],
  gallery: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
      type: "image" as const,
      caption: "Ocean View Room",
    },
  ],
  promotions: [
    {
      id: "1",
      title: "Summer Special",
      description: "20% off on all rooms",
      discount: 20,
      startDate: new Date(),
      endDate: new Date("2024-12-31"),
      code: "SUMMER20",
    },
  ],
  earnings: [
    {
      id: "1",
      amount: 500,
      date: new Date(),
      type: "earning" as const,
      status: "completed" as const,
      description: "Room Booking",
    },
  ],
};

const Profile = () => {
  const [userType, setUserType] = useState<UserType>('traveler');
  const { toast } = useToast();

  useEffect(() => {
    // Simulate profile loading
    toast({
      title: "Profile Loaded",
      description: `Loaded ${userType} profile`,
    });
  }, [userType, toast]);

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* User Type Selector */}
          <div className="mb-6 flex justify-center space-x-4">
            <button
              onClick={() => handleUserTypeChange('traveler')}
              className={`px-4 py-2 rounded-full ${
                userType === 'traveler'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Traveler View
            </button>
            <button
              onClick={() => handleUserTypeChange('guide')}
              className={`px-4 py-2 rounded-full ${
                userType === 'guide'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Guide View
            </button>
            <button
              onClick={() => handleUserTypeChange('provider')}
              className={`px-4 py-2 rounded-full ${
                userType === 'provider'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Provider View
            </button>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {userType === 'traveler' && <TravelerProfile profile={mockTravelerData} />}
            {userType === 'guide' && <GuideProfile profile={mockGuideData} />}
            {userType === 'provider' && <ProviderProfile profile={mockProviderData} />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;