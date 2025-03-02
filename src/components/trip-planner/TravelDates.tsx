import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const TravelDates = ({ onNext }: { onNext: () => void }) => {
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [noOfDays, setNoOfDays] = useState<number>(0);

  const [flightNumber, setFlightNumber] = useState<string>("");
  const [airline, setAirline] = useState<string>("");
  const [departureAirport, setDepartureAirport] = useState<string>("");
  const [arrivalAirport, setArrivalAirport] = useState<string>("");
  const [flightDate, setFlightDate] = useState<string>("");
  const [flightTime, setFlightTime] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const [needAirportPickup, setNeedAirportPickup] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to calculate number of days and validate dates
  const calculateDays = (arrival: string, departure: string) => {
    if (arrival && departure) {
      const arrivalTime = new Date(arrival).getTime();
      const departureTime = new Date(departure).getTime();

      if (departureTime <= arrivalTime) {
        setError("Departure date must be after the arrival date.");
        setDepartureDate(""); // Reset the departure date
        setNoOfDays(0);
        return;
      } else {
        setError("");
        const diffDays = Math.max((departureTime - arrivalTime) / (1000 * 60 * 60 * 24), 0);
        setNoOfDays(diffDays);
      }
    }
  };

  const isNextDisabled: boolean = !arrivalDate || !departureDate || !!error;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Travel Dates & Duration</h2>

      {/* Travel Dates Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Arrival Date *</label>
          <Input
            type="date"
            value={arrivalDate}
            onChange={(e) => {
              setArrivalDate(e.target.value);
              calculateDays(e.target.value, departureDate);
            }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Departure Date *</label>
          <Input
            type="date"
            value={departureDate}
            min={arrivalDate} // Restrict selection to future dates
            onChange={(e) => {
              setDepartureDate(e.target.value);
              calculateDays(arrivalDate, e.target.value);
            }}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Number of Days</label>
          <Input type="number" value={noOfDays} readOnly />
        </div>
      </div>

      {/* Flight Details Section */}
      <h2 className="text-2xl font-semibold">Flight Details (Optional)</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Flight Number</label>
          <Input
            type="text"
            placeholder="E.g., EK654"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Airline</label>
          <Input
            type="text"
            placeholder="E.g., Emirates"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Departure Airport</label>
            <Input
              type="text"
              placeholder="E.g., DXB (Dubai)"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Arrival Airport</label>
            <Input
              type="text"
              placeholder="E.g., CMB (Colombo)"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Flight Date</label>
            <Input
              type="date"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Flight Time</label>
            <Input
              type="time"
              value={flightTime}
              onChange={(e) => setFlightTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Airport Pickup Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="airport-pickup"
          checked={needAirportPickup}
          onCheckedChange={(checked) => setNeedAirportPickup(!!checked)}
        />
        <label htmlFor="airport-pickup" className="text-sm font-medium">
          Need Airport Pickup? <span className="text-gray-500">(Charges apply)</span>
        </label>
      </div>

      {/* Additional Notes for Pickup */}
      {needAirportPickup && (
        <div>
          <label className="block text-sm font-medium mb-1">Additional Notes</label>
          <Textarea
            placeholder="E.g., Need airport pickup, wheelchair assistance, baggage details"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={3}
          />
        </div>
      )}

      <Button onClick={onNext} className="w-full" disabled={isNextDisabled}>
        Next: Budget & Accommodation
      </Button>
    </div>
  );
};

export default TravelDates;
