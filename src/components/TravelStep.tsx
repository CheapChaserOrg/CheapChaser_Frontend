import { ReactNode } from "react";

interface TravelStepProps {
  icon: ReactNode;
  time: string;
  title: string;
  description: string;
  last?: boolean;
  delayClass?: string;
}

const TravelStep = ({
  icon,
  time,
  title,
  description,
  last = false,
  delayClass = "",
}: TravelStepProps) => {
  return (
    <div className={`relative pl-12 pb-8 opacity-0 animate-slide-up ${delayClass}`}>
      <div className="absolute left-0 top-0 h-8 w-8 flex items-center justify-center bg-white border border-itinerary-border rounded-full z-10">
        {icon}
      </div>
      
      {!last && <div className="travel-step-line" />}
      
      <div className="mb-1 text-xs text-itinerary-text-secondary font-medium">
        {time}
      </div>
      
      <h3 className="text-lg font-semibold mb-1.5">{title}</h3>
      
      <p className="text-sm text-itinerary-text-secondary">
        {description}
      </p>
    </div>
  );
};

export default TravelStep;
