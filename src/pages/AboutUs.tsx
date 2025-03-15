import React, { useState } from "react";
import { motion } from "framer-motion";

const budgetRanges = [
  "Backpack Traveler (Under LKR 6000/night)",
  "Budget Traveler (LKR 19500-37500/night)",
  "Mid Range Traveler (LKR 38500-69000/night)",
  "Luxury Traveler (LKR 70000+/night)",
];

const accommodationTypes = [
  "Hotel",
  "Resort",
  "Guesthouse",
  "Homestay",
];

const specialNeeds = [
  { id: 1, label: "Wheelchair Accessible" },
  { id: 2, label: "Pet Friendly" },
  { id: 3, label: "Smoking Allowed" },
];

const getAccommodationTypesForBudget = (budgetRange) => {
  switch (budgetRange) {
    case "Backpack Traveler (Under LKR 6000/night)":
      return ["Homestay"];
    case "Budget Traveler (LKR 19500-37500/night)":
      return ["Guesthouse"];
    case "Mid Range Traveler (LKR 38500-69000/night)":
      return ["Guesthouse"];
    case "Luxury Traveler (LKR 70000+/night)":
      return ["Hotel"];
    default:
      return accommodationTypes;
  }
};

const RenderAccommodationPreferences = () => {
  const [accommodationOptions, setAccommodationOptions] = useState(accommodationTypes);
  const [specialNeedsSelections, setSpecialNeedsSelections] = useState([]);
  const [budgetRange, setBudgetRange] = useState("");

  const handleBudgetChange = (value) => {
    setBudgetRange(value);
    const filteredTypes = getAccommodationTypesForBudget(value);
    setAccommodationOptions(filteredTypes);
  };

  const handleCheckboxChange = (checked, label) => {
    if (checked) {
      setSpecialNeedsSelections((prevSelections) => [...prevSelections, label]);
    } else {
      setSpecialNeedsSelections((prevSelections) =>
        prevSelections.filter((item) => item !== label)
      );
    }
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
      initial="hidden"
      animate="show"
      exit="exit"
      className="space-y-6"
    >
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="space-y-2">
        <h3 className="text-xl font-medium">Budget & Accommodation Preferences</h3>
        <p className="text-muted-foreground">Tell us about your budget and accommodation preferences</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="grid gap-6 md:grid-cols-2 pt-2">
        {/* Budget Range Selection */}
        <div className="form-item">
          <label className="form-label">Suggested Budget Range (per day)</label>
          <select
            className="form-control"
            value={budgetRange}
            onChange={(e) => handleBudgetChange(e.target.value)}
          >
            <option value="">Select a budget range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <p className="form-description">Select your preferred budget range per day.</p>
        </div>

        {/* Preferred Accommodation Type */}
        <div className="form-item">
          <label className="form-label">Preferred Accommodation Type</label>
          <select className="form-control">
            <option value="">Select accommodation type</option>
            {accommodationOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <p className="form-description">Choose your preferred type of accommodation</p>
        </div>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="space-y-3 pt-4">
        <div className="form-item">
          <div className="mb-4">
            <label className="form-label">Special Accommodation Needs</label>
            <p className="form-description">Select any special accommodation preferences you have</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialNeeds.map((item) => (
              <div key={item.id} className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border bg-white/50">
                <input
                  type="checkbox"
                  checked={specialNeedsSelections.includes(item.label)}
                  onChange={(e) => handleCheckboxChange(e.target.checked, item.label)}
                  className="h-4 w-4"
                />
                <label className="cursor-pointer font-normal">{item.label}</label>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RenderAccommodationPreferences;
