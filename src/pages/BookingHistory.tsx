import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Mock data - replace with actual API calls
const mockActivityBookings = [
  {
    id: 1,
    activityName: "Surfing Lesson",
    date: new Date("2024-04-15"),
    participants: 2,
    status: "confirmed",
  },
  {
    id: 2,
    activityName: "Hiking Tour",
    date: new Date("2024-04-20"),
    participants: 4,
    status: "pending",
  },
];

const mockHotelBookings = [
  {
    id: 1,
    hotelName: "Seaside Resort",
    checkIn: new Date("2024-04-15"),
    checkOut: new Date("2024-04-18"),
    rooms: 1,
    guests: 2,
    status: "confirmed",
  },
];

const BookingHistory = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Your Bookings</h1>
        
        <Tabs defaultValue="activities" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="activities">Activity Bookings</TabsTrigger>
            <TabsTrigger value="hotels">Hotel Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activities" className="animate-fade-in">
            <div className="grid gap-4">
              {mockActivityBookings.map((booking) => (
                <Card key={booking.id} className="backdrop-blur-sm bg-white/90">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{booking.activityName}</CardTitle>
                        <CardDescription>
                          {format(booking.date, "PPP")}
                        </CardDescription>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Participants: {booking.participants}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hotels" className="animate-fade-in">
            <div className="grid gap-4">
              {mockHotelBookings.map((booking) => (
                <Card key={booking.id} className="backdrop-blur-sm bg-white/90">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{booking.hotelName}</CardTitle>
                        <CardDescription>
                          {format(booking.checkIn, "PPP")} - {format(booking.checkOut, "PPP")}
                        </CardDescription>
                      </div>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>Rooms: {booking.rooms} | Guests: {booking.guests}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookingHistory;