import { useState } from "react";
import { Button } from "@/components/ui/button";

const Accommodation = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [accommodationType, setAccommodationType] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const budgetOptions = [
    { label: "100 - 150 (Basic Budget)", min: 100, max: 150 },
    { label: "150 - 200 (Standard Budget)", min: 150, max: 200 },
    { label: "200 - 300 (Comfort Budget)", min: 200, max: 300 },
    { label: "300 - 400 (Mid-Range Economy)", min: 300, max: 400 },
    { label: "400 - 500 (Premium Economy)", min: 400, max: 500 },
    { label: "500 - 750 (Affordable Luxury)", min: 500, max: 750 },
    { label: "750 - 1,000 (Luxury Lite)", min: 750, max: 1000 },
    { label: "1,000 - 1,500 (Luxury)", min: 1000, max: 1500 },
    { label: "1,500 - 2,000 (Premium Luxury)", min: 1500, max: 2000 },
    { label: "2,000 - 3,000 (High-End Travel)", min: 2000, max: 3000 },
    { label: "3,000 - 4,000 (VIP Experience)", min: 3000, max: 4000 },
    { label: "4,000 - 5,000 (Ultra-Luxury)", min: 4000, max: 5000 },
    { label: "5,000 - 7,500 (Exclusive Retreat)", min: 5000, max: 7500 },
    { label: "7,500 - 10,000 (Elite Traveler)", min: 7500, max: 10000 },
    { label: "10,000+ (Billionaire Lifestyle)", min: 10000, max: Infinity },
  ];

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!budgetRange) {
      newErrors.budgetRange = "Please select a budget range.";
    }

    if (!budgetAmount) {
      newErrors.budgetAmount = "Please enter a budget amount.";
    } else {
      const selectedRange = budgetOptions.find((option) => option.label === budgetRange);
      if (
        selectedRange &&
        (Number(budgetAmount) < selectedRange.min || Number(budgetAmount) > selectedRange.max)
      ) {
        newErrors.budgetAmount = `Budget must be between $${selectedRange.min} and $${selectedRange.max}.`;
      }
    }

    if (!accommodationType) {
      newErrors.accommodationType = "Please select an accommodation type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Budget & Accommodation Preferences</h2>

      <div className="space-y-4">
        {/* Suggested Budget Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Suggested Budget Ranges</label>
          <select
            className="w-full p-2 border rounded-md"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
          >
            <option value="">Select budget range</option>
            {budgetOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.budgetRange && <p className="text-red-500 text-sm">{errors.budgetRange}</p>}
        </div>

        {/* Budget Amount Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Budget Amount ($)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your budget amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
          {errors.budgetAmount && <p className="text-red-500 text-sm">{errors.budgetAmount}</p>}
        </div>

        {/* Preferred Accommodation Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Accommodation Type</label>
          <select
            className="w-full p-2 border rounded-md"
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
          >
            <option value="">Select accommodation type</option>
            {accommodationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.accommodationType && <p className="text-red-500 text-sm">{errors.accommodationType}</p>}
        </div>

        {/* Special Accommodation Needs */}
        <div>
          <label className="block text-sm font-medium mb-2">Special Accommodation Needs</label>
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

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={handleNext} className="w-full">
          Next: Travel Style
        </Button>
      </div>
    </div>
  );
};

export default Accommodation;
