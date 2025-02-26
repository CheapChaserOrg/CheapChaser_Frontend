import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TripPlanner from "./pages/TripPlanner";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";

// import NotFound from "./pages/NotFound";
// import Bookings from "./pages/Bookings";
// import BookingHistory from "./pages/BookingHistory";
// import Feedback from "./pages/Feedback";
// import ViewRatings from "./pages/ViewRatings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login/:userType" element={<Login />} />
        <Route path="/signup/:userType" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        
      </Routes>
    </Router>
  );
}

export default App;