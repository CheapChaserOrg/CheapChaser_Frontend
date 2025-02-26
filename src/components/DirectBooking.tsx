import { Link } from 'react-router-dom';

const DirectBooking = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Book Directly with Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find and book the perfect accommodation or activity for your Sri Lankan adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Find Accommodation</h3>
            <p className="text-gray-600 mb-6">
              Browse through our curated selection of hotels, resorts, and unique stays
            </p>
            <Link
              to="/login/traveler"
              className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Browse Hotels
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Discover Activities</h3>
            <p className="text-gray-600 mb-6">
              Explore exciting activities and adventures across Sri Lanka
            </p>
            <Link
              to="/login/traveler"
              className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Browse Activities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectBooking;