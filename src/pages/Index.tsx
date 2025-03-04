import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import DirectBooking from '../components/DirectBooking';
import homeImage from '../images/home2.jpeg';
import Sigiriya from '../images/sigiriya.jpg';
import Ella from '../images/ella.jpg';
import Galle from '../images/galle.jpg';
import { FeedbackForm } from '@/components/FeedbackForm';
import { FeedbackList } from '@/components/FeedbackList';

interface Feedback {
  id: number;
  rating: number;
  country: string;
  age: string;
  comment: string;
  date: string;
}

const Index = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);



  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={homeImage}
            alt="Sri Lanka Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Discover Sri Lanka
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Experience the beauty of paradise on a budget
          </p>
          <button 
            onClick={() => navigate('/trip-planner')}
            className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-colors animate-float inline-block"
          >
            Plan My Trip
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Travel With Us?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make budget travel easy and enjoyable, without compromising on experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="Curated Destinations"
              description="Handpicked locations that offer the best of Sri Lanka's culture and nature."
            />
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Flexible Planning"
              description="Customize your itinerary to match your preferences and schedule."
            />
            <FeatureCard
              icon={<DollarSign className="w-6 h-6" />}
              title="Budget Friendly"
              description="Amazing experiences that don't break the bank, with transparent pricing."
            />
          </div>
        </div>
      </section>

      {/* Direct Booking Section */}
      <DirectBooking />

      {/* Destinations Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore some of our most loved locations across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DestinationCard
              image={Sigiriya}
              title="Sigiriya"
              description="Ancient palace and fortress complex"
            />
            <DestinationCard
              image={Ella}
              title="Ella"
              description="Scenic mountain village and hiking trails"
            />
            <DestinationCard
              image={Galle}
              title="Galle"
              description="Historic coastal fort and colonial architecture"
            />
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Submit Your Feedback
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your feedback helps us improve and helps other travelers make better decisions.
            </p>
          </div>

          <div className="mb-16">
            <FeedbackForm onSubmit={handleSubmitFeedback} />
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Feedback
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what other travelers are saying about their experiences.
            </p>
          </div>

          <FeedbackList feedbacks={feedbacks} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-on-scroll opacity-0 hover:bg-[#F0F8FF] hover:text-white">
    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;