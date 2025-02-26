import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  details: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Sigiriya",
    description: "Ancient palace and fortress complex",
    details: "Known as the 'Lion Rock', this UNESCO World Heritage site features ancient frescoes and water gardens dating back to the 5th century.",
    image: "https://images.unsplash.com/photo-1586551065109-29c4b6e4b19e?q=80&w=800"
  },
  {
    id: 2,
    name: "Ella",
    description: "Scenic mountain village",
    details: "A picturesque hill country village famous for tea plantations, hiking trails, and the iconic Nine Arch Bridge.",
    image: "https://images.unsplash.com/photo-1586183189334-1ad3cd238e88?q=80&w=800"
  },
  {
    id: 3,
    name: "Galle Fort",
    description: "Historic coastal fortress",
    details: "A Dutch colonial-era fortress featuring historic architecture, boutique shops, and stunning ocean views.",
    image: "https://images.unsplash.com/photo-1578128178799-ffac19d3978e?q=80&w=800"
  },
  {
    id: 4,
    name: "Yala National Park",
    description: "Wildlife sanctuary",
    details: "Home to leopards, elephants, and diverse wildlife. One of Sri Lanka's premier national parks for safari experiences.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800"
  },
  {
    id: 5,
    name: "Kandy",
    description: "Cultural capital",
    details: "Home to the Temple of the Tooth Relic and surrounded by tea plantations, Kandy is the cultural heart of Sri Lanka.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800"
  },
  {
    id: 6,
    name: "Mirissa",
    description: "Coastal paradise",
    details: "Famous for whale watching, surfing, and pristine beaches. Perfect for both relaxation and adventure.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800"
  }
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          Explore Sri Lanka
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group relative"
            >
              <Card className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <p className="text-muted-foreground">{destination.description}</p>
                </div>
                
                {/* Hover Details */}
                <div className="absolute inset-0 bg-primary/95 p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center">{destination.details}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;