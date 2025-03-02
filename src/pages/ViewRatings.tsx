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

const ViewRatings = () => {
  // Mock data - replace with actual API call
  const [ratings] = useState<Rating[]>([
    {
      id: "1",
      bookingId: "B001",
      rating: 5,
      comment: "Amazing experience! The hotel was perfect and the activities were well organized.",
      userName: "John Doe",
      date: "2024-02-01"
    },
    {
      id: "2",
      bookingId: "B002",
      rating: 4,
      comment: "Great service and beautiful location. Would recommend!",
      userName: "Jane Smith",
      date: "2024-02-02"
    }
  ]);

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      
    </div>
  );
};

export default ViewRatings;