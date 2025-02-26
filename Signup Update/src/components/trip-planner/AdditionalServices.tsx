import { useState } from "react";
import { Button } from "@/components/ui/button";

const AdditionalServices = ({ onSubmit, onBack }: { onSubmit: () => void; onBack: () => void }) => {
  const [needGuide, setNeedGuide] = useState(false);
  const [needSIM, setNeedSIM] = useState(false);
  const [needCurrencyExchange, setNeedCurrencyExchange] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Additional Services</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needGuide}
              onChange={(e) => setNeedGuide(e.target.checked)}
              className="rounded"
            />
            <span>Need a Local Guide (For cultural, wildlife, or adventure tours)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needSIM}
              onChange={(e) => setNeedSIM(e.target.checked)}
              className="rounded"
            />
            <span>Require SIM Card & Internet Services</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={needCurrencyExchange}
              onChange={(e) => setNeedCurrencyExchange(e.target.checked)}
              className="rounded"
            />
            <span>Want Assistance with Currency Exchange</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button onClick={onSubmit} className="w-full">
          Submit Trip Plan
        </Button>
      </div>
    </div>
  );
};

export default AdditionalServices;