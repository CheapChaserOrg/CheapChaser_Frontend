import { Button } from "@/components/ui/button";
import { Route } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-itinerary-light">
      <div className="text-center max-w-2xl px-4">
        
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in opacity-0 delay-100">
          Here is Your Perfectly Planned , <br />Srilanka Tour
        </h1>
        
        <p className="text-xl text-itinerary-text-secondary mb-8 animate-fade-in opacity-0 delay-200">
          Meticulously crafted itineraries for exploring Sri Lanka's spectacular Southern Province.
          View your final travel plan with a single click.
        </p>
        
        <Link to="/itinerary">
          <Button 
            className="bg-teal-600 text-white px-6 py-6 rounded-lg text-lg font-medium hover:bg-teal-300 animate-fade-in opacity-0 delay-300 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Route className="mr-2 h-5 w-5" />
            View Your Itinerary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
