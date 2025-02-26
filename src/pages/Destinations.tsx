import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card } from '@/components/ui/card';
import Sigirya from '../images/sigiriya.jpg'
import ella from '../images/ella.jpg'
import gallefort from '../images/galle.jpg'
import yala from '../images/yala.jpg'
import mirissa from '../images/mirissa.jpg'
import kandy from '../images/kandy.jpg'
import sripada from '../images/sripada.jpg'
import dambulla from '../images/Dambulla-mobile.jpg'
import nuwaraeliya from '../images/Nuwara-Eliya-City-Tour-1200x630-1.jpg'



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
    image: Sigirya
  },
  {
    id: 2,
    name: "Ella",
    description: "Scenic mountain village",
    details: "A picturesque hill country village famous for tea plantations, hiking trails, and the iconic Nine Arch Bridge.",
    image: ella
  },
  {
    id: 3,
    name: "Galle Fort",
    description: "Historic coastal fortress",
    details: "A Dutch colonial-era fortress featuring historic architecture, boutique shops, and stunning ocean views.",
    image: gallefort
  },
  {
    id: 4,
    name: "Yala National Park",
    description: "Wildlife sanctuary",
    details: "Home to leopards, elephants, and diverse wildlife. One of Sri Lanka's premier national parks for safari experiences.",
    image: yala
  },
  {
    id: 5,
    name: "Kandy",
    description: "Cultural capital",
    details: "Home to the Temple of the Tooth Relic and surrounded by tea plantations, Kandy is the cultural heart of Sri Lanka.",
    image: kandy
  },
  {
    id: 6,
    name: "Mirissa",
    description: "Coastal paradise",
    details: "Famous for whale watching, surfing, and pristine beaches. Perfect for both relaxation and adventure.",
    image: mirissa
  },
  {
    id: 7,
    name: "Sri Pada",
    description: "A sacred pilgrimage",
    details: "A sacred pilgrimage site with a footprint-shaped rock revered by multiple religions.",
    image: sripada
  },
  {
    id: 8,
    name: "Dambulla Cave Temple",
    description: "A historic cave ",
    details: " A historic cave monastery filled with ancient Buddhist murals and over 150 Buddha statues.",
    image: dambulla
  },
  {
    id: 9,
    name: "Nuwara Eliya",
    description: "Little England",
    details: "A charming hill station known as “Little England,” famous for its cool climate and lush tea estates.",
    image: nuwaraeliya
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