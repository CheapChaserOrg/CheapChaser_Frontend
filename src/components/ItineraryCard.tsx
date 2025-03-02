
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ItineraryCardProps {
  title: string;
  icon: ReactNode;
  date: string;
  children: ReactNode;
  delayClass?: string;
  className?: string;
}

const ItineraryCard = ({
  title,
  icon,
  date,
  children,
  delayClass = "",
  className,
}: ItineraryCardProps) => {
  return (
    <div
      className={cn(
        "itinerary-card rounded-xl border border-itinerary-border bg-itinerary-card p-6 mb-6 opacity-0 animate-scale-in",
        delayClass,
        className
      )}
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full mr-4">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-itinerary-text-secondary">{date}</p>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ItineraryCard;
