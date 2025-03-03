
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ActivityCard, { ActivityProps } from './ActivityCard';
import { cn } from '@/lib/utils';
import Navbar from '../components/Navbar';

// Sample data for Southern Province activities
const southernActivities: ActivityProps[] = [
  {
    id: '1',
    title: 'Whale Watching in Mirissa',
    location: 'Mirissa Harbor, Southern Province',
    date: 'Sep 15, 2023',
    time: '6:00 AM - 11:00 AM',
    price: 45,
    capacity: 20,
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Experience the magnificent blue whales and dolphins in their natural habitat during this early morning boat tour.',
  },
  {
    id: '2',
    title: 'Galle Fort Walking Tour',
    location: 'Galle, Southern Province',
    date: 'Sep 16, 2023',
    time: '9:00 AM - 12:00 PM',
    price: 25,
    capacity: 12,
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1586867791680-127b4796c3dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Explore the historic Galle Fort, a UNESCO World Heritage site, with a knowledgeable local guide. Learn about colonial architecture and rich history.',
  },
  {
    id: '3',
    title: 'Surf Lessons at Weligama',
    location: 'Weligama Bay, Southern Province',
    date: 'Sep 17, 2023',
    time: '8:00 AM - 10:00 AM',
    price: 35,
    capacity: 8,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1526994636733-4c05e8e063fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Perfect for beginners, these surf lessons take place in the gentle waves of Weligama Bay. All equipment provided.',
  },
  {
    id: '4',
    title: 'Yala Safari Adventure',
    location: 'Yala National Park, Southern Province',
    date: 'Sep 18, 2023',
    time: '5:30 AM - 11:00 AM',
    price: 75,
    capacity: 6,
    category: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1679254671571-8f46d41581b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: "Explore Sri Lanka's most famous national park and look for leopards, elephants, crocodiles and many bird species.",
  },
  {
    id: '5',
    title: 'Cooking Class in Unawatuna',
    location: 'Unawatuna, Southern Province',
    date: 'Sep 19, 2023',
    time: '10:00 AM - 1:00 PM',
    price: 40,
    capacity: 10,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Learn to cook authentic Sri Lankan cuisine with a local chef, then enjoy your creations for lunch.',
  },
  {
    id: '6',
    title: 'Stilt Fishing Experience',
    location: 'Koggala, Southern Province',
    date: 'Sep 20, 2023',
    time: '4:00 PM - 6:00 PM',
    price: 30,
    capacity: 8,
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1544864645-b53fa3e2d031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Try the traditional Sri Lankan fishing method and learn about this unique cultural practice from local fishermen.',
  },
];

// Filter categories based on available activities
const categories = Array.from(new Set(southernActivities.map(activity => activity.category)));

const UpcomingActivities = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredActivities = selectedCategory 
    ? southernActivities.filter(activity => activity.category === selectedCategory)
    : southernActivities;

  return (
    <Navbar />
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-srilanka-primary">
            Southern Province
          </span>
        </div>
        <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          Upcoming Activities
        </h2>
        
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              !selectedCategory
                ? "bg-srilanka-primary text-white"
                : "bg-secondary hover:bg-srilanka-light"
            )}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-srilanka-primary text-white"
                  : "bg-secondary hover:bg-srilanka-light"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingActivities;
