
import { Calendar, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItineraryHeaderProps {
  title: string;
  subtitle: string;
  dates: string;
  className?: string;
}

const ItineraryHeader = ({
  title,
  subtitle,
  dates,
  className,
}: ItineraryHeaderProps) => {
  return (
    <div
      className={cn(
        "pb-8 animate-fade-in opacity-0",
        className
      )}
    >
      <div className="inline-flex items-center px-3 py-1 mb-2 text-xs bg-black text-white rounded-full">
        <BookOpen size={12} className="mr-1.5" />
        <span className="font-medium">Final Itinerary</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
      <p className="text-lg text-itinerary-text-secondary mb-4">{subtitle}</p>
      
      <div className="flex items-center text-sm text-itinerary-text-secondary">
        <Calendar size={16} className="mr-2" />
        <span>{dates}</span>
      </div>
    </div>
  );
};

export default ItineraryHeader;
