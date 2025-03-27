import React, { useEffect, useState } from "react";
import { createPayment } from "../api/paymentApi";
import "./PaymentForm.css";

declare global {
    interface Window {
        payhere: any;
    }
}

const PaymentForm: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [payhereLoaded, setPayhereLoaded] = useState(false);

    useEffect(() => {
        setOrderId(`ORDER_${Math.floor(Math.random() * 100000)}`);

        if (!document.querySelector(`script[src="https://www.payhere.lk/lib/payhere.js"]`)) {
            const script = document.createElement("script");
            script.src = "https://www.payhere.lk/lib/payhere.js";
            script.async = true;
            script.onload = () => {
                console.log("✅ PayHere script loaded successfully");
                setPayhereLoaded(true);
            };
            script.onerror = () => console.error("❌ Failed to load PayHere script");
            document.body.appendChild(script);
        } else {
            setPayhereLoaded(true);
        }
    }, []);

    const handlePayment = async () => {
        if (!firstName || !lastName || !email || !phone || !amount || !cardNumber || !expiryDate || !cvc) {
            alert("⚠️ Please fill all fields before proceeding.");
            return;
        }

        if (!acceptTerms) {
            setShowTermsError(true);
            return;
        } else {
            setShowTermsError(false);
        }

        if (!payhereLoaded || !window.payhere) {
            alert("⚠️ Payment service is not ready. Please wait and try again.");
            console.error("❌ PayHere is not loaded yet");
            return;
        }

        try {
            console.log("📡 Sending payment data to backend...");

            const paymentData = { firstName, lastName, email, phone, amount, orderId };
            const response = await createPayment(paymentData);

            console.log("✅ Payment data sent successfully:", response);

            const payment = {
                sandbox: true,
                merchant_id: "1229842",
                return_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancel",
                notify_url: "http://localhost:8080/api/payment/notify",
                order_id: orderId,
                items: "Tour Package",
                amount: amount,
                currency: "LKR",
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                address: "123, Sample Address",
                city: "Colombo",
                country: "Sri Lanka",
            };

            window.payhere.startPayment(payment);

        } catch (error) {
            console.error("❌ Error connecting to backend:", error);
            alert("⚠️ Payment process failed. Please try again.");
        }
    };

    return (
        <div className="payment-container">
            <div className="background-image"></div>

            <div className="payment-box">
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <p className="summary-item">Tour Package</p>
                    <p className="price">LKR {amount || "0.00"}</p>
                    <hr />
                    <p className="summary-total">Total Due</p>
                    <p className="price total">LKR {amount || "0.00"}</p>
                </div>

                <div className="payment-form">
                    <h2>Payment Details</h2>
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type="number" placeholder="Amount (LKR)" value={amount} onChange={(e) => setAmount(e.target.value)} />

                    {/* Card Details */}
                    <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                    <input type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                    <input type="password" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />

                    {/* Privacy Policy Checkbox */}
                    <div className="terms">
                        <input
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => {
                                setAcceptTerms(e.target.checked);
                                setShowTermsError(!e.target.checked);
                            }}
                        />
                        <label>I agree to the privacy policy and terms of service.</label>
                    </div>

                    {showTermsError && <p className="error-message">⚠️ Accepting terms and privacy statement is required to proceed.</p>}

                    <button onClick={handlePayment}>Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
