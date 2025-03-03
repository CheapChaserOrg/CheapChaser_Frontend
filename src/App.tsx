import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TripPlanner from "./pages/TripPlanner";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ActivityDetails from "./pages/ActivityDetails";
import ActivityCom from "./pages/ActivityCom";
import Gallery from "./pages/GalleryCom";
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
        <Route path="/activity/:id" element={<ActivityDetails />} />
        <Route path="/activity" element={<ActivityCom />} />
        <Route path="/gallery" element={<Gallery/>} />
      </Routes>
    </Router>
  );
}

export default App;