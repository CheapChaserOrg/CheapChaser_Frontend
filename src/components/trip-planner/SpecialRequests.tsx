import { useState } from "react";
import { Button } from "@/components/ui/button";

const SpecialRequests = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [allergies, setAllergies] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Allergy Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Please specify any allergies or dietary restrictions <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Enter any allergy or dietary information here"
            rows={3}
            required
          />
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
