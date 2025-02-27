import React from "react";
import { Calendar, User, DollarSign, Clock, MapPin, Hotel, Activity, CreditCard } from 'lucide-react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const touristInfo = {
  name: "Sarah Johnson",
  interests: ["Beach", "Culture", "Adventure", "Wildlife"],
  budget: "$2,500",
  duration: "7 days"
};

const itinerary = [
  {
    day: 1,
    activities: ["Arrival", "City Tour", "Cultural Show"],
    accommodation: "Cinnamon Grand Colombo",
    attractions: ["Gangaramaya Temple", "Galle Face Green"],
    cost: 350
  },
  {
    day: 2,
    activities: ["Beach Day", "Surfing Lessons"],
    accommodation: "Weligama Bay Marriott",
    attractions: ["Mirissa Beach", "Weligama Bay"],
    cost: 280
  },
  {
    day: 3,
    activities: ["Safari", "Nature Walk"],
    accommodation: "Yala Cinnamon Wild",
    attractions: ["Yala National Park", "Beach Sunset"],
    cost: 420
  }
];

const totalCost = itinerary.reduce((sum, day) => sum + day.cost, 0);

function GenApp() {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar/>
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-12 px-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Your Custom Tour Itinerary
          </h1>
          <p className="text-center mt-4 text-green-100">
            Discover the beauty of Sri Lanka
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Tourist Information */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="mr-2 text-green-600" />
            Tourist Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 flex items-center mb-3">
                <User className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-medium">Name:</span>
                <span className="ml-2">{touristInfo.name}</span>
              </p>
              <p className="text-gray-600 flex items-center mb-3">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-medium">Budget:</span>
                <span className="ml-2">{touristInfo.budget}</span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-center mb-3">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-medium">Duration:</span>
                <span className="ml-2">{touristInfo.duration}</span>
              </p>
              <div className="text-gray-600 flex items-start mb-3">
                <Activity className="w-5 h-5 mr-2 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">Interests:</span>
                  <span className="ml-2">{touristInfo.interests.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Itinerary Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <Calendar className="mr-2 text-green-600" />
            Itinerary Overview
          </h2>
          <div className="space-y-6">
            {itinerary.map((day) => (
              <div key={day.day} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-600">
                    Day {day.day}
                  </h3>
                  <span className="text-gray-600 font-medium">
                    ${day.cost}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 flex items-center mb-3">
                      <Activity className="w-5 h-5 mr-2 text-green-600" />
                      <span className="font-medium">Activities:</span>
                      <span className="ml-2">{day.activities.join(", ")}</span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Hotel className="w-5 h-5 mr-2 text-green-600" />
                      <span className="font-medium">Accommodation:</span>
                      <span className="ml-2">{day.accommodation}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-start">
                      <MapPin className="w-5 h-5 mr-2 text-green-600 mt-1 flex-shrink-0" />
                      <span>
                        <span className="font-medium">Attractions:</span>
                        <span className="ml-2">{day.attractions.join(", ")}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <CreditCard className="mr-2 text-green-600" />
                Total Cost
              </h2>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${totalCost}
              </p>
            </div>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold 
                           transition-colors duration-200 hover:bg-green-700 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Customize Your itinerary
            </button>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold 
                           transition-colors duration-200 hover:bg-green-700 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Confirm Your itinerary
            </button>
          </div>
        </section>
      </main>

     <Footer/>
    </div>
  );
}

export default GenApp;