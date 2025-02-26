import { useState } from "react";
import { Button } from "@/components/ui/button";

const Transportation = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [transportMode, setTransportMode] = useState("");
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);

  const transportOptions = [
    "Private Car with Driver",
    "Self-Drive (Rental Car, Scooter)",
    "Public Transport (Bus, Train, Tuk-tuk)",
    "Luxury Tour Bus or Chauffeur Service",
  ];

  const specialTransportOptions = [
    "Scenic Train Rides (Kandy to Ella)",
    "Domestic Flights",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Transportation Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Mode of Travel
          </label>
          <select
            className="w-full p-2 border rounded-md"
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
          >
            <option value="">Select transport mode</option>
            {transportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Special Transport Requests
          </label>
          <div className="space-y-2">
            {specialTransportOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={specialRequests.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSpecialRequests([...specialRequests, option]);
                    } else {
                      setSpecialRequests(
                        specialRequests.filter((item) => item !== option)
                      );
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
          Next: Food & Preferences
        </Button>
      </div>
    </div>
  );
};

export default Transportation;