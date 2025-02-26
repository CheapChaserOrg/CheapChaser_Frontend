import { useState } from "react";
import { Button } from "@/components/ui/button";

const Accommodation = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [budgetRange, setBudgetRange] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);

  const budgetOptions = ["Luxury", "Mid-range", "Budget"];
  const accommodationTypes = [
    "Hotels",
    "Resorts",
    "Hostels",
    "Guesthouses",
    "Airbnb",
    "Eco-lodges",
  ];
  const specialNeedsOptions = [
    "Sea view",
    "Jungle stay",
    "Camping",
    "Villa",
    "Cultural stay",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Budget & Accommodation Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Budget Range</label>
          <select
            className="w-full p-2 border rounded-md"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Accommodation Type
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
          >
            <option value="">Select accommodation type</option>
            {accommodationTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Special Accommodation Needs
          </label>
          <div className="grid grid-cols-2 gap-2">
            {specialNeedsOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={specialNeeds.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSpecialNeeds([...specialNeeds, option]);
                    } else {
                      setSpecialNeeds(specialNeeds.filter((item) => item !== option));
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
          Next: Travel Style
        </Button>
      </div>
    </div>
  );
};

export default Accommodation;