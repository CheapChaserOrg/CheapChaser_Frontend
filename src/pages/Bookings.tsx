import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityBookingForm from "@/components/booking/ActivityBookingForm";
import HotelBookingForm from "@/components/booking/HotelBookingForm";
import { useToast } from "@/components/ui/use-toast";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const { toast } = useToast();

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Book Your Perfect Trip</h1>
        
        <Tabs 
          defaultValue="activity" 
          className="w-full max-w-3xl mx-auto"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="activity">Activity Booking</TabsTrigger>
            <TabsTrigger value="hotel">Hotel Booking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="animate-fade-in">
            <ActivityBookingForm />
          </TabsContent>
          
          <TabsContent value="hotel" className="animate-fade-in">
            <HotelBookingForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookings;