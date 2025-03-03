import { Accommodation, Activity } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export const AccommodationCard = ({ accommodation }: AccommodationCardProps) => {
  const { toast } = useToast();

  const handleAddToItinerary = () => {
    toast({
      title: "Added to Itinerary",
      description: `${accommodation.title} has been added to your trip.`,
    });
  };

  return (
    <Card className="card-hover">
      <CardHeader className="p-0">
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={accommodation.image}
            alt={accommodation.title}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-2">{accommodation.title}</CardTitle>
        <p className="text-muted-foreground mb-4">{accommodation.description}</p>
        <p className="text-lg font-semibold text-primary">
          ${accommodation.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={handleAddToItinerary} className="w-full">
          Add to Itinerary
        </Button>
      </CardFooter>
    </Card>
  );
};