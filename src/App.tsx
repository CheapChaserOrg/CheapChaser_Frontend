import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PaymentPage from "./pages/PaymentPage";
import PaymentForm from "./components/PaymentForm";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/review" element={<PaymentPage />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
            </Routes>
        </Router>
    );
};

export default App;
