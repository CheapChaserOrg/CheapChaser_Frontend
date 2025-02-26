import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TravelDates from "../components/trip-planner/TravelDates";
import Accommodation from "../components/trip-planner/Accommodation";
import TravelStyle from "../components/trip-planner/TravelStyle";
import Transportation from "../components/trip-planner/Transportation";
import FoodPreferences from "../components/trip-planner/FoodPreferences";
import SpecialRequests from "../components/trip-planner/SpecialRequests";
import AdditionalServices from "../components/trip-planner/AdditionalServices";
import { useToast } from "../hooks/use-toast";

const TripPlanner = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Trip Plan Submitted",
      description: "We'll get back to you soon with your customized itinerary!",
    });
    // Reset form or redirect
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Plan Your Trip</h1>
            <p className="text-gray-600 mt-2">
              Tell us about your dream Sri Lankan vacation
            </p>
          </div>

          {step === 1 && <TravelDates onNext={handleNext} />}
          {step === 2 && (
            <Accommodation onNext={handleNext} onBack={handleBack} />
          )}
          {step === 3 && <TravelStyle onNext={handleNext} onBack={handleBack} />}
          {step === 4 && (
            <Transportation onNext={handleNext} onBack={handleBack} />
          )}
          {step === 5 && (
            <FoodPreferences onNext={handleNext} onBack={handleBack} />
          )}
          {step === 6 && (
            <SpecialRequests onNext={handleNext} onBack={handleBack} />
          )}
          {step === 7 && (
            <AdditionalServices onSubmit={handleSubmit} onBack={handleBack} />
          )}

          <div className="mt-8">
            <div className="flex justify-center">
              <span className="text-sm text-gray-500">
                Step {step} of 7
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TripPlanner;