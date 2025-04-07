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