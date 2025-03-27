import React from "react";

const Cancel: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
            <p>Your booking has not been confirmed.</p>
        </div>
    );
};

export default Cancel;
