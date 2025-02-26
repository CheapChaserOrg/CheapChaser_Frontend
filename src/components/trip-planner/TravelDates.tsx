import { useState } from "react";
import { Button } from "@/components/ui/button";

const TravelDates = ({ onNext }: { onNext: () => void }) => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flightDetails, setFlightDetails] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Travel Dates & Duration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Arrival Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Departure Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Flight Details (Optional)
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter flight details for airport pickup/drop-off"
            value={flightDetails}
            onChange={(e) => setFlightDetails(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <Button onClick={onNext} className="w-full">
        Next: Budget & Accommodation
      </Button>
    </div>
  );
};

export default TravelDates;