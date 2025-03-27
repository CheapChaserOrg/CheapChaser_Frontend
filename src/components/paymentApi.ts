import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/payment";  // ✅ Backend URL

export const createPayment = async (paymentData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, paymentData);
        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
};
