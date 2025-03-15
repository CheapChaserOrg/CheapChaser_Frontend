import { useState } from "react";

const activities: string[] = [
  "Trekking",
  "Surfing",
  "Safari",
  "Scuba Diving",
  "Temple Visits",
  "Heritage Tours",
  "Village Experiences",
  "Beach Stays",
  "Ayurveda & Spa",
  "Waterfall Visits",
  "Food Tours",
  "Tea Plantation Visits",
  "Cooking Classes",
];

const ActivitySelector = ({ days }: { days: number }) => {
  const [selectedActivities, setSelectedActivities] = useState<(string | null)[]>(Array(days).fill(null));

  const handleActivityChange = (dayIndex: number, activity: string) => {
    setSelectedActivities((prev) => {
      const newSelection = [...prev];
      newSelection[dayIndex] = newSelection[dayIndex] === activity ? null : activity;
      return newSelection;
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Select Activities for Each Day</h2>
      <p className="text-gray-600 mb-4">Choose one activity per day.</p>

      {Array.from({ length: days }).map((_, dayIndex) => (
        <div key={dayIndex} className="mb-6">
          <h3 className="text-lg font-semibold">Day {dayIndex + 1}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {activities.map((activity) => (
              <label
                key={activity}
                className={`flex items-center p-3 border rounded-md cursor-pointer ${
                  selectedActivities[dayIndex] === activity ? "bg-blue-100 border-blue-500" : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  name={`day-${dayIndex}`}
                  value={activity}
                  checked={selectedActivities[dayIndex] === activity}
                  onChange={() => handleActivityChange(dayIndex, activity)}
                  className="mr-2"
                />
                {activity}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Test Component
const TestComponent = () => {
  return <ActivitySelector days={4} />; // Change 4 to test different numbers of days
};

export default TestComponent;
