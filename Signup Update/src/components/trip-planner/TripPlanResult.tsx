import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { CalendarDays, Hotel, MapPin, Users } from "lucide-react";

interface TripDay {
  day: number;
  activities: string[];
  accommodation: {
    name: string;
    type: string;
    price: number;
  };
  guide?: {
    name: string;
    expertise: string;
  };
}

interface TripPlanResultProps {
  tripPlan: {
    days: TripDay[];
    totalBudget: number;
  };
  onFinalize: () => void;
  onCustomize: () => void;
}

const TripPlanResult = ({ tripPlan, onFinalize, onCustomize }: TripPlanResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Trip Plan</CardTitle>
          <CardDescription>
            A carefully curated itinerary based on your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {tripPlan.days.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Day {day.day}</h3>
                  <div className="space-y-2">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      <span className="font-medium">{day.accommodation.name}</span>
                      <span className="text-muted-foreground ml-auto">
                        ${day.accommodation.price}
                      </span>
                    </div>
                    {day.guide && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{day.guide.name}</span>
                        <span className="text-muted-foreground">
                          ({day.guide.expertise})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                <span className="font-semibold">Total Budget:</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                ${tripPlan.totalBudget}
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={onCustomize}
                variant="outline"
                className="flex-1"
              >
                Customize Trip
              </Button>
              <Button
                onClick={onFinalize}
                className="flex-1"
              >
                Finalize & Pay
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TripPlanResult;