import { useState } from "react";
import { Button } from "@/components/ui/button";

const TravelStyle = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [travelStyles, setTravelStyles] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);

  const styleOptions = [
    "Adventure (Hiking, Wildlife, Surfing, Diving)",
    "Cultural & Historical (Temples, Heritage sites, Museums)",
    "Relaxation (Beach stays, Spa, Ayurveda)",
    "Nature & Wildlife (National Parks, Waterfalls, Forests)",
    "Local Experiences (Food tours, Village life, Festivals)",
    "Religious & Spiritual Travel",
  ];

  const activityOptions = [
    "Trekking (Ella, Knuckles)",
    "Surfing (Arugam Bay)",
    "Scuba diving",
    "Safari (Yala, Wilpattu)",
    "Historical Sites Tour",
    "Beach Hopping",
    "Tea Plantation Visits",
    "Cultural Experiences",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Travel Style & Interests</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Travel Style
          </label>
          <div className="space-y-2">
            {styleOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={travelStyles.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTravelStyles([...travelStyles, option]);
                    } else {
                      setTravelStyles(travelStyles.filter((item) => item !== option));
                    }
                  }}
                  className="rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Specific Activities of Interest
          </label>
          <div className="grid grid-cols-2 gap-2">
            {activityOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={activities.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setActivities([...activities, option]);
                    } else {
                      setActivities(activities.filter((item) => item !== option));
                    }
                  }}
                  className="rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Next: Transportation
        </Button>
      </div>
    </div>
  );
};

export default TravelStyle;