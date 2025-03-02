import { useState } from "react";
import { Button } from "@/components/ui/button";

const Transportation = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [transportMode, setTransportMode] = useState("");
  const [specialRequests, setSpecialRequests] = useState<string[]>([]);
  const [travelType, setTravelType] = useState("Solo");
  const [groupSize, setGroupSize] = useState("");
  const [purchaseForGroup, setPurchaseForGroup] = useState(false);
  const [groupType, setGroupType] = useState("");
  const [hasChildrenOrElderly, setHasChildrenOrElderly] = useState(false);
  const [error, setError] = useState("");

  const transportOptions = [
    { mode: "Private Car with Driver", capacity: "1-4 people" },
    { mode: "Self-Drive (Rental Car, Scooter)", capacity: "1-2 people" },
    { mode: "Public Transport (Bus, Train, Tuk-tuk)", capacity: "Varies" },
    { mode: "Luxury Tour Bus or Chauffeur Service", capacity: "10-50 people" },
    { mode: "Shared Taxi or Ride-Sharing", capacity: "1-4 people" },
    { mode: "Bicycle or E-Bike", capacity: "1 person" },
    { mode: "Motorbike Rental", capacity: "1-2 people" },
    { mode: "Campervan or RV", capacity: "2-6 people" },
    { mode: "Boat or Ferry", capacity: "Varies" },
  ];

  const handleNext = () => {
    if (!transportMode) {
      setError("Please select a preferred mode of travel.");
      return;
    }
    if (travelType === "Group" && (!groupSize || Number(groupSize) <= 0)) {
      setError("Please enter a valid group size.");
      return;
    }
    if (travelType === "Group" && !groupType) {
      setError("Please select a group type.");
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Transportation Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Travel Type <span className="text-red-500">*</span></label>
          <select className="w-full p-2 border rounded-md" value={travelType} onChange={(e) => setTravelType(e.target.value)}>
            <option value="Solo">Solo</option>
            <option value="Couple">Couple</option>
            <option value="Group">Group</option>
          </select>
        </div>

        {travelType === "Group" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Group Size <span className="text-red-500">*</span></label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Group Type <span className="text-red-500">*</span></label>
              <select className="w-full p-2 border rounded-md" value={groupType} onChange={(e) => setGroupType(e.target.value)}>
                <option value="">Select Group Type</option>
                <option value="Family Trip">Family Trip</option>
                <option value="Friends' Trip">Friends' Trip</option>
                <option value="Corporate Retreat">Corporate Retreat</option>
                <option value="School/University Trip">School/University Trip</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasChildrenOrElderly}
                  onChange={(e) => setHasChildrenOrElderly(e.target.checked)}
                  className="rounded"
                />
                <span>Are there children or elderly members in the group?</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={purchaseForGroup}
                  onChange={(e) => setPurchaseForGroup(e.target.checked)}
                  className="rounded"
                />
                <span>Do you want to purchase the trip plan for the whole group?</span>
              </label>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Mode of Travel <span className="text-red-500">*</span></label>
          <select
            className="w-full p-2 border rounded-md"
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
          >
            <option value="">Select transport mode</option>
            {transportOptions.map((option) => (
              <option key={option.mode} value={option.mode}>
                <strong>{option.mode}</strong> ({option.capacity})
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={handleNext} className="w-full">
          Next: Food & Preferences
        </Button>
      </div>
    </div>
  );
};

export default Transportation;
