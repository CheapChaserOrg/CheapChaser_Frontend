import { useState } from "react";
import { Button } from "@/components/ui/button";

const FoodPreferences = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [cuisineExperiences, setCuisineExperiences] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");

  const dietaryOptions = ["Vegetarian", "Vegan", "Halal", "Gluten-Free"];
  const cuisineOptions = ["Street food", "Fine dining", "Cooking classes"];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Food & Dietary Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Dietary Preferences
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={dietaryPreferences.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDietaryPreferences([...dietaryPreferences, option]);
                    } else {
                      setDietaryPreferences(
                        dietaryPreferences.filter((item) => item !== option)
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

        <div>
          <label className="block text-sm font-medium mb-2">
            Local Cuisine Experiences
          </label>
          <div className="grid grid-cols-2 gap-2">
            {cuisineOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={cuisineExperiences.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCuisineExperiences([...cuisineExperiences, option]);
                    } else {
                      setCuisineExperiences(
                        cuisineExperiences.filter((item) => item !== option)
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

        <div>
          <label className="block text-sm font-medium mb-2">
            Allergies or Special Dietary Requirements
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Please list any allergies or special dietary requirements"
            rows={3}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onNext} className="w-full">
          Next: Special Requests
        </Button>
      </div>
    </div>
  );
};

export default FoodPreferences;