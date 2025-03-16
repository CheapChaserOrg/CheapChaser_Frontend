import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { saveActivityBooking } from "@/services/bookingService";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  activityName: z.string().min(2, "Activity name must be at least 2 characters"),
  date: z.date({
    required_error: "Please select a date",
  }),
  participants: z.string().min(1, "Number of participants is required"),
  specialRequirements: z.string().optional(),
  provider: z.string().min(1, "Please select a provider"),
});

// Activity provider mapping
const activityProviders = {
  "Surfing Lesson": ["Wave Riders", "Beach Pros", "Surf Masters"],
  "Scuba Diving": ["Deep Blue Divers", "Coral Explorers", "Ocean Adventure"],
  "Hiking Tour": ["Mountain Trekkers", "Forest Guides", "Nature Explorers"],
  "Kayaking": ["River Rapids", "Sea Kayakers", "Coastal Adventures"],
  "Snorkeling": ["Reef Explorers", "Tropical Fish Tours", "Bay Snorkelers"]
};

const ActivityBookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityName: "",
      specialRequirements: "",
      provider: "",
    },
  });

  // Update providers when activity changes
  useEffect(() => {
    const activity = form.watch("activityName");
    if (activity && activity in activityProviders) {
      setSelectedActivity(activity);
      setProviders(activityProviders[activity as keyof typeof activityProviders]);
      // Reset the provider value when activity changes
      form.setValue("provider", "");
    } else {
      setProviders([]);
      setSelectedActivity("");
    }
  }, [form.watch("activityName"), form]);

  const handleInitialSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Activity booking details:", values);
    setBookingData({
      activityName: values.activityName,
      date: values.date,
      participants: parseInt(values.participants),
      provider: values.provider,
      specialRequirements: values.specialRequirements || "",
    });
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    if (!bookingData) return;
    
    try {
      setIsLoading(true);
      // Save booking to Firebase
      await saveActivityBooking(bookingData);
      
      toast({
        title: "Booking Successful!",
        description: "Your activity has been booked successfully.",
      });
      
      // Redirect to booking history page
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
          amount={99.99} // Replace with actual amount calculation
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          bookingType="activity"
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="activityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Surfing Lesson" list="activity-suggestions" {...field} />
              </FormControl>
              <datalist id="activity-suggestions">
                {Object.keys(activityProviders).map((activity) => (
                  <option key={activity} value={activity} />
                ))}
              </datalist>
              <FormMessage />
            </FormItem>
          )}
        />

        {providers.length > 0 && (
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Provider for {selectedActivity}</FormLabel>
                <div className="space-y-3">
                  {providers.map((provider) => (
                    <div key={provider} className="flex items-center space-x-2">
                      <Checkbox 
                        id={provider} 
                        checked={field.value === provider}
                        onCheckedChange={() => field.onChange(provider)}
                      />
                      <label 
                        htmlFor={provider} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {provider}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Participants</FormLabel>
              <FormControl>
                <Input type="number" min="1" placeholder="Enter number of participants" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requirements (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requirements or notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#2a9d8f] hover:bg-[#2a9d8f]/80 text-white" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ActivityBookingForm;
