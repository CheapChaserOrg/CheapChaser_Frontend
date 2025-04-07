import { useState } from "react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackList } from "@/components/FeedbackList";

interface Feedback {
  id: number;
  rating: number;
  country: string;
  age: string;
  comment: string;
  date: string;
}

const Index = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      rating: 5,
      country: "United States",
      age: "25-34",
      comment: "Amazing experience! The tour guide was very knowledgeable and friendly.",
      date: "2024-02-20",
    },
    {
      id: 2,
      rating: 4,
      country: "UK",
      age: "35-44",
      comment: "Great service, but could improve the transportation arrangements.",
      date: "2024-02-19",
    },
  ]);
  const handleSubmitFeedback = (newFeedback: {
    rating: number;
    country: string;
    age: string;
    comment: string;
  }) => {
    const feedback: Feedback = {
      id: feedbacks.length + 1,
      ...newFeedback,
      date: new Date().toISOString().split('T')[0],
    };
    setFeedbacks([feedback, ...feedbacks]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="hero-section mb-12">
        <div className="container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
            Share Your Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 fade-in">
            Help others plan their perfect trip with your valuable feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;