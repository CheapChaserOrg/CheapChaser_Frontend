import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Welcome to Cheap Chaser</h1>
            <button
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700"
                onClick={() => navigate("/review")}
            >
                Start Planning
            </button>
        </div>
    );
};

export default Home;
