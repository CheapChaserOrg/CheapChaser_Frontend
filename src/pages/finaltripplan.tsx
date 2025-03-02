import React from "react";
import ItineraryHeader from "@/components/ItineraryHeader";
import ItineraryCard from "@/components/ItineraryCard";
import TravelStep from "@/components/TravelStep";
import { 
  Plane, 
  Car, 
  Bed, 
  Utensils, 
  Landmark, 
  MapPin,
  Waves,
  Palmtree
} from "lucide-react";

const Itinerary = () => {
  // In a real app, this data would come from an API or state
  const itineraryData = {
    title: "Sri Lanka Southern Adventure",
    subtitle: "Your complete itinerary for an unforgettable journey through the Southern Province",
    dates: "Nov 10 - Nov 17, 2023",
    days: [
      {
        day: "Day 1",
        date: "Nov 10, 2023",
        activities: [
          {
            type: "transportation",
            icon: <Plane size={18} />,
            time: "09:30 AM",
            title: "Flight to Colombo",
            description: "SriLankan Airlines UL208 from Dubai to CMB. Terminal 1, Gate 7."
          },
          {
            type: "transportation",
            icon: <Car size={18} />,
            time: "03:15 PM",
            title: "Private Transfer to Galle",
            description: "Luxury van from Bandaranaike Airport to Galle Fort (2.5 hours)."
          },
          {
            type: "accommodation",
            icon: <Bed size={18} />,
            time: "06:00 PM",
            title: "Check-in: Amangalla Resort",
            description: "10 Church Street, Galle Fort, Galle. Colonial heritage property."
          },
          {
            type: "dining",
            icon: <Utensils size={18} />,
            time: "08:00 PM",
            title: "Dinner at The Fort Printers",
            description: "39 Pedlar Street, Galle Fort. Sri Lankan seafood. Reservation confirmed."
          }
        ]
      },
      {
        day: "Day 2",
        date: "Nov 11, 2023",
        activities: [
          {
            type: "sightseeing",
            icon: <Landmark size={18} />,
            time: "09:00 AM",
            title: "Galle Fort Walking Tour",
            description: "UNESCO World Heritage site exploration. Meet guide at hotel lobby."
          },
          {
            type: "dining",
            icon: <Utensils size={18} />,
            time: "12:30 PM",
            title: "Lunch at Poonie's Kitchen",
            description: "63 Pedlar Street, Galle Fort. Farm-to-table Sri Lankan cuisine."
          },
          {
            type: "sightseeing",
            icon: <Waves size={18} />,
            time: "02:30 PM",
            title: "Unawatuna Beach",
            description: "Relaxation at one of Sri Lanka's most beautiful beaches."
          },
          {
            type: "dining",
            icon: <Utensils size={18} />,
            time: "07:30 PM",
            title: "Sunset Dinner at Wijaya Beach",
            description: "Dalawella Beach, Unawatuna. Beachfront dining with fresh seafood."
          }
        ]
      },
      {
        day: "Day 3",
        date: "Nov 12, 2023",
        activities: [
          {
            type: "sightseeing",
            icon: <Palmtree size={18} />,
            time: "08:30 AM",
            title: "Mirissa Whale Watching",
            description: "Private boat tour to see blue whales and dolphins. 3-4 hour excursion."
          },
          {
            type: "dining",
            icon: <Utensils size={18} />,
            time: "01:00 PM",
            title: "Lunch at No. 1 Roti Shop",
            description: "Mirissa Beach Road. Famous for traditional Sri Lankan roti and curries."
          },
          {
            type: "sightseeing",
            icon: <MapPin size={18} />,
            time: "03:00 PM",
            title: "Stilt Fishermen at Koggala",
            description: "Witness traditional Sri Lankan fishing technique, photography opportunity."
          },
          {
            type: "dining",
            icon: <Utensils size={18} />,
            time: "07:00 PM",
            title: "Dinner at Church Street Social",
            description: "Amangalla Resort, Galle. Fine dining with Sri Lankan and international cuisine."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-itinerary-light">
      <div className="itinerary-container">
        <ItineraryHeader
          title={itineraryData.title}
          subtitle={itineraryData.subtitle}
          dates={itineraryData.dates}
        />

        {itineraryData.days.map((day, dayIndex) => (
          <ItineraryCard
            key={day.day}
            title={day.day}
            date={day.date}
            icon={<span className="text-sm">{dayIndex + 1}</span>}
            delayClass={`delay-${(dayIndex + 1) * 100}`}
          >
            {day.activities.map((activity, actIndex) => (
              <TravelStep
                key={`${day.day}-${actIndex}`}
                icon={activity.icon}
                time={activity.time}
                title={activity.title}
                description={activity.description}
                last={actIndex === day.activities.length - 1}
                delayClass={`delay-${(dayIndex + 1) * 100 + (actIndex + 1) * 100}`}
              />
            ))}
          </ItineraryCard>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
