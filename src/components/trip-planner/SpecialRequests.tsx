import { useState } from "react";
import { Button } from "@/components/ui/button";

const SpecialRequests = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [medicalNeeds, setMedicalNeeds] = useState("");
  const [travelType, setTravelType] = useState("");
  const [festivalInterests, setFestivalInterests] = useState<string[]>([]);
  const [photoRequests, setPhotoRequests] = useState(false);

  const travelTypes = ["Solo", "Couple", "Family", "Honeymoon", "Group"];
  const festivals = [
    "Perahera",
    "Vesak",
    "Sinhala-Tamil New Year",
    "Deepavali",
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Special Requests & Considerations</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Medical Conditions or Accessibility Needs
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={medicalNeeds}
            onChange={(e) => setMedicalNeeds(e.target.value)}
            placeholder="Please describe any medical conditions or accessibility requirements"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Travel Type</label>
          <select
            className="w-full p-2 border rounded-md"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option value="">Select travel type</option>
            {travelTypes.map((type) => (
              <option key={type} value={type.toLowerCase()}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Festival Interests
          </label>
          <div className="grid grid-cols-2 gap-2">
            {festivals.map((festival) => (
              <label key={festival} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={festivalInterests.includes(festival)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFestivalInterests([...festivalInterests, festival]);
                    } else {
                      setFestivalInterests(
                        festivalInterests.filter((item) => item !== festival)
                      );
                    }
                  }}
                  className="rounded"
                />
                <span>{festival}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={photoRequests}
              onChange={(e) => setPhotoRequests(e.target.checked)}
              className="rounded"
            />
            <span>Photography/Videography Services Required</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Next: Additional Services
        </Button>
      </div>
    </div>
  );
};

export default SpecialRequests;