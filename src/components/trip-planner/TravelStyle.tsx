import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TravelStyle = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [travelStyles, setTravelStyles] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  const styleOptions = [
    "Adventure & Nature",
    "Cultural & Historical",
    "Relaxation & Leisure",
    "Food & Cultural Experiences",
  ];

  const activityCategories = {
    "Adventure & Nature": [
      { name: "Trekking", locations: "Ella, Knuckles" },
      { name: "Surfing", locations: "Arugam Bay, Weligama" },
      { name: "Safari", locations: "Yala, Wilpattu" },
      { name: "Scuba Diving", locations: "Hikkaduwa, Trincomalee" },
    ],
    "Cultural & Historical": [
      { name: "Temple Visits", locations: "Dambulla, Anuradhapura" },
      { name: "Heritage Tours", locations: "Sigiriya, Galle Fort" },
      { name: "Village Experiences", locations: "Hiriwadunna, Tissamaharama" },
    ],
    "Relaxation & Leisure": [
      { name: "Beach Stays", locations: "Mirissa, Unawatuna" },
      { name: "Ayurveda & Spa", locations: "Bentota, Negombo" },
      { name: "Waterfall Visits", locations: "Diyaluma, Bambarakanda" },
    ],
    "Food & Cultural Experiences": [
      { name: "Food Tours", locations: "Colombo, Kandy" },
      { name: "Tea Plantation Visits", locations: "Nuwara Eliya, Ella" },
      { name: "Cooking Classes", locations: "Negombo, Galle" },
    ],
  };

  const districts = ["Galle", "Matara", "Hambantota"];

  const districtPlaces = {
    Galle: [
      { name: "Galle Fort", type: "Historical" },
      { name: "Unawatuna Beach", type: "Relaxation" },
      { name: "Jungle Beach", type: "Adventure" },
      { name: "Koggala Lake Boat Safari", type: "Nature" },
      { name: "Sea Turtle Hatchery", type: "Wildlife" },
    ],
    Matara: [
      { name: "Mirissa Beach", type: "Relaxation" },
      { name: "Whale Watching", type: "Adventure" },
      { name: "Dondra Lighthouse", type: "Historical" },
      { name: "Polhena Beach", type: "Leisure" },
      { name: "Weherahena Temple", type: "Cultural" },
    ],
    Hambantota: [
      { name: "Yala National Park", type: "Wildlife" },
      { name: "Bundala National Park", type: "Bird Watching" },
      { name: "Ridiyagama Safari Park", type: "Adventure" },
      { name: "Hambantota Salterns", type: "Nature" },
      { name: "Kataragama Temple", type: "Religious" },
    ],
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Travel Style & Interests</h2>

        {/* Preferred Travel Style Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Travel Style</label>
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

        {/* Activity Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Activities of Interest</label>
          {Object.keys(activityCategories).map((category) => (
            <div key={category} className="mt-2">
              <h4 className="text-md font-semibold">{category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {activityCategories[category].map((activity) => (
                  <Tooltip key={activity.name}>
                    <TooltipTrigger>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activities.includes(activity.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setActivities([...activities, activity.name]);
                            } else {
                              setActivities(activities.filter((item) => item !== activity.name));
                            }
                          }}
                          className="rounded"
                        />
                        <span>{activity.name}</span>
                      </label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-blue-200 text-black px-3 py-2 rounded-md shadow-md">
                      <p>Popular in: {activity.locations}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* District Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Districts to Visit</label>
          <div className="grid grid-cols-3 gap-2">
            {districts.map((district) => (
              <label key={district} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedDistricts.includes(district)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDistricts([...selectedDistricts, district]);
                    } else {
                      setSelectedDistricts(selectedDistricts.filter((item) => item !== district));
                    }
                  }}
                  className="rounded"
                />
                <span>{district}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Recommended Places with Selectable Checkboxes & Tooltips */}
        {selectedDistricts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Recommended Places to Visit</h3>
            <div className="space-y-4">
              {selectedDistricts.map((district) => (
                <div key={district}>
                  <h4 className="text-md font-semibold">{district}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {districtPlaces[district].map((place) => (
                      <Tooltip key={place.name}>
                        <TooltipTrigger>
                          <label className="flex items-center space-x-2 cursor-pointer border px-3 py-2 rounded-md bg-gray-100">
                            <input
                              type="checkbox"
                              checked={selectedPlaces.includes(place.name)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPlaces([...selectedPlaces, place.name]);
                                } else {
                                  setSelectedPlaces(selectedPlaces.filter((item) => item !== place.name));
                                }
                              }}
                              className="rounded"
                            />
                            <span>{place.name}</span>
                          </label>
                        </TooltipTrigger>
                        <TooltipContent className="bg-blue-200 text-black px-3 py-2 rounded-md shadow-md w-64">
                          <img src={place.image} alt={place.name} className="w-full h-32 object-cover rounded-md mb-2" />
                          <p className="text-sm font-semibold">{place.name}</p>
                          <p className="text-xs">{place.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <Button variant="outline" onClick={onBack} className="w-full">
            Back
          </Button>
          <Button onClick={onNext} className="w-full">
            Next: Transportation
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TravelStyle; 