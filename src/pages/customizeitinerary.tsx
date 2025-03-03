import { ActivityCard } from "@/components/ActivityCard";
import { AccommodationCard } from "@/components/AccommodationCard";
import { PreferencesForm } from "@/components/PreferencesForm";
import { Activity } from "@/lib/types";
import { Accommodation } from "@/lib/types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const activities: Activity[] = [
  {
    id: "1",
    title: "Surfing",
    description: "Experience the thrill of surfing in Sri Lanka’s stunning Southern Province, a paradise for wave riders of all levels! With its warm waters, golden beaches, and consistent waves, this region offers the perfect surfing getaway.",
    price: 299.99,
    image: "https://www.lovesrilanka.org/wp-content/uploads/2020/06/LSL_B2_Blog_1200x600.jpg",
  },
  {
    id: "2",
    title: "Snorkling",
    description: "Discover the breathtaking underwater world of Sri Lanka’s Southern Province, where crystal-clear waters, vibrant coral reefs, and diverse marine life await! Whether you're a beginner o",
    price: 149.99,
    image: "https://www.holidify.com/images/cmsuploads/compressed/Lakshadweep_20190708111445.jpg",
    
  },
  {
    id: "3",
    title: "Jet Ski Rides",
    description: "Feel the adrenaline rush as you speed across the crystal-clear waters of Sri Lanka’s Southern Province on a high-powered Jet Ski! Whether you're a thrill-seeker or just looking for a fun way to explore the coastline, Jet Skiing offers an unforgettable water adventure.",
    price: 149.99,
    image: "https://www.unawatunadive.com/images/service/gallery/-574765469_190628375437_1512979968_n.jpg",
    
  },
  {
    id: "4",
    title: "Whale Watching",
    description: "Head to Mirissa for an unforgettable experience, where you can spot blue whales, sperm whales, and dolphins in their natural habitat, especially between November and April.",
    price: 149.99,
    image: "https://i.ytimg.com/vi/ymCu9scf01A/maxresdefault.jpg",
    
  },
  {
    id: "5",
    title: "Explore Galle For",
    description: "Step back in time at the UNESCO World Heritage-listed Galle Fort, a colonial masterpiece with cobblestone streets, quaint cafes, and historical buildings. Explore the Galle Lighthouse and the fort ramparts for stunning ocean views.",
    price: 149.99,
    image: "https://static.saltinourhair.com/wp-content/uploads/2016/11/23154331/galle-dutch-fort-sri-lanka-lighthouse.jpg",
    
  },
  {
    id: "6",
    title: "Visit the Japanese Peace Pagoda",
    description: "A serene Buddhist temple offering panoramic views.",
    price: 149.99,
    image: "https://www.villathawthisa.com/images/Things_to_do/photos/f01459bd34b7293bc22c01313ef052a9.jpg",
    
  },
  {
    id: "7",
    title: "Stilt Fishing in Koggala",
    description: "Observe or try this traditional fishing method.",
    price: 149.99,
    image: "https://i.pinimg.com/736x/b5/12/8f/b5128fd144eed63f5392b23395137ce3.jpg",
    
  },
];

const accommodation: Accommodation[] = [
  {
    id: "6",
    title: "Anantara Peace Haven Tangalle Resort",
    description: "A luxury beachfront resort set amidst coconut plantations, offering private villas with pools, fine dining, and a world-class spa. Perfect for a tranquil getaway.",
    price: 299.99,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/64690425.jpg?k=adf9d8bde18c1032773a445b3cd8d1fdda9de7cbd294e0115f3b7c705358f19e&o=&hp=1",
  },
  {
    id: "7",
    title: "Cape Weligam",
    description: "An upscale resort perched on a clifftop with breathtaking ocean views, spacious villas, an infinity pool, and exceptional personalized service. Ideal for a luxurious retreat.",
    price: 149.99,
    image: "https://www.i-escape.com/image/hotel/cape-weligama/overview/302029.jpg",
    
  },
  {
    id: "8",
    title: "Le Grand Galle",
    description: "A stylish and modern hotel overlooking the Indian Ocean and the historic Galle Fort, featuring elegant rooms, an infinity pool, and fine dining options.",
    price: 149.99,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/174997700.jpg?k=d14a49e71bbeff56a57429affe6eb1aa128053b6cb68c786d9ec6af48bdc3e03&o=&hp=1",
    
  },
  {
    id: "9",
    title: "Jetwing Lighthouse",
    description: "Designed by renowned architect Geoffrey Bawa, this colonial-style beachfront hotel blends heritage charm with modern comforts, offering spacious rooms, multiple pools, and exquisite cuisine.",
    price: 149.99,
    image: "https://r1imghtlak.mmtcdn.com/c005b47276e311e98c1a0242ac110003.jpg",
    
  },
  {
    id: "10",
    title: "The Fortress Resort & Spa",
    description: "A boutique luxury resort inspired by colonial Dutch architecture, featuring ocean-facing rooms, a serene spa, and a relaxing beachfront setting. Perfect for a romantic escape.",
    price: 149.99,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/175203022.jpg?k=fed4d2340a96e68ebc65fe1de4e492ed42ed35ff5fa4f0d28c3c948cc8a2278b&o=&hp=1",
    
  },
  {
    id: "11",
    title: "The Fort Bazaar",
    description: "A stylish boutique hotel in the heart of Galle Fort, featuring elegant rooms and a tranquil courtyard restaurant. Perfect for couples and history lovers.",
    price: 149.99,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/149023700.jpg?k=2a2a5d1a9d50bd2cccd17fe2f87e8eac7ee9eec8093f907de14fdab3ee66205c&o=&hp=1,
    
  },
  {
    id: "12",
    title: "Taru Villas - Rampart Street",
    description: "A sophisticated boutique hotel inside Galle Fort, offering personalized service and a cozy atmosphere.",
    price: 149.99,
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/427627188.jpg?k=202df645f6b07d173a3e83efdbbf79b546f20cc5bfd37ed038079f058fbd49cc&o=&hp=1,
    
  },
  {
    id: "13",
    title: "Amanwella",
    description: "A beachfront paradise in Tangalle with private plunge pools, fine dining, and a peaceful ambiance, perfect for a luxurious escape.",
    price: 149.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQsQRCTnuF2kFmuk3il4idKGPtWLW42txkQ&s,
    
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Customize Your Trip</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Activity List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <PreferencesForm />
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Accomadation List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accommodation.map((accommodation) => (
                <AccommodationCard key={accommodation.id} accommodation={accommodation} />
              ))}
            </div>
          </div>
          
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Index;
