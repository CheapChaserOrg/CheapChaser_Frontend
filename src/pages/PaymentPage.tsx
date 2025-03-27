import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-6">Review Your Trip</h1>
            <button
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700"
                onClick={() => navigate("/payment")}
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default PaymentPage;
