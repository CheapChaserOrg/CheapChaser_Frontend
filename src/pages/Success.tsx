import React from "react";

const Success: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
            <p>Your trip is now confirmed.</p>
        </div>
    );
};

export default Success;
