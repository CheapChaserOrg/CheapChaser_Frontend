import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import DirectBooking from '../components/DirectBooking';
import Feedback from '../components/Feedback';
import homeImage from '../images/home2.jpeg';
import unawatuna from '../images/Unawatuna.jpg';
import Galle from '../images/galle.jpg';
import kanneliya from '../images/kanneliya.jpg';
import perhara from '../images/perahara.jpg';
import avurudu from '../images/avurudu.jpg';
import litfes from '../images/litfes.jpg';

const Index = () => {
  const navigate = useNavigate();

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

      {/* Direct Booking Section */}
      <Feedback />

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
              image={Galle}
              title="Galle Fort"
              description="A UNESCO World Heritage Site built by the Portuguese and later expanded by the Dutch. It features colonial architecture, cobbled streets, and stunning sea views."
            />
            <DestinationCard
              image={unawatuna}
              title="Unawatuna Beach"
              description="A famous crescent-shaped beach with golden sand, turquoise waters, and great snorkeling and diving spots.                                                         "
            />
            <DestinationCard
              image={kanneliya}
              title="Kanneliya Forest Reserve"
              description="A biodiversity hotspot with waterfalls, hiking trails, and endemic species."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Seasonal Festivals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
            Galle hosts several vibrant festivals throughout the year, celebrating its rich history, culture, and arts. Here are some of the most popular festivals in Galle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FestivalCard
              image={litfes}
              title="Galle Literary Festival"
              time='January/February'
              description="One of the most prestigious literary events in South Asia, the Galle Literary Festival attracts writers, poets, and intellectuals from around the world. The event features book readings, discussions, workshops, and cultural performances set within the historic Galle Fort."
            />
            <FestivalCard
              image={avurudu}
              title="Sinhala & Tamil New Year (Avurudu Festival)"
              time='April 13–14'
              description="A major Sri Lankan festival marking the traditional New Year, featuring traditional games, feasting, and cultural rituals. Families in Galle celebrate with oil lamp lighting, sweetmeats, and fireworks. "
            />
            <FestivalCard
              image={perhara}
              title="Unawatuna Perahera"
              time='June/July (Poson Poya period)'
              description="A religious festival held at various Buddhist temples in and around Galle, celebrating the sacred Esala Poya. The festival includes vibrant processions, traditional dances, and rituals honoring the Buddha’s teachings."
            />
          </div>
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

const DestinationCard = ({ image, title, description }: { image: string; title: string; description: string }) => (
  <div className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-on-scroll opacity-0">
    <div className="relative h-64 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-6 bg-white">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const FestivalCard = ({ image, title, time, description }: { image: string; title: string; time:string; description: string }) => (
  <div className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-on-scroll opacity-0">
    <div className="relative h-64 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-6 bg-white">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <h3 className="text-base font-semibold text-gray-500 mb-2">{time}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;
