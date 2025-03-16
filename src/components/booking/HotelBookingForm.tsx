import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PaymentForm from "../payment/PaymentForm";
import { saveHotelBooking } from "@/services/bookingService";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  hotelName: z.string().min(2, "Hotel name must be at least 2 characters"),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required",
  }),
  rooms: z.string().min(1, "Number of rooms is required"),
  guests: z.string().min(1, "Number of guests is required"),
  specialRequests: z.string().optional(),
});

const HotelBookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelName: "",
      specialRequests: "",
    },
  });

  const handleInitialSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Hotel booking details:", values);
    setBookingData({
      hotelName: values.hotelName,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      rooms: parseInt(values.rooms),
      guests: parseInt(values.guests),
      specialRequests: values.specialRequests || "",
    });
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!bookingData) return;

    try {
      setIsLoading(true);
      await saveHotelBooking(bookingData);
      toast({
        title: "Booking Successful!",
        description: "Your hotel has been booked successfully.",
      });
      navigate("/booking-history");
    } catch (error) {
      console.error("Error saving booking:", error);
      toast({
        title: "Error",
        description: "There was an error saving your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowPayment(false);
      form.reset();
    }
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <PaymentForm
          amount={199.99}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          bookingType="hotel"
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Form fields for hotel booking */}
        {/* ... (same as your original form fields) ... */}
      </form>
    </Form>
  );
};

export default HotelBookingForm;