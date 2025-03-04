import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            alert('Payment successful!');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3>Payment Form</h3>
            <CardElement style={styles.cardElement} />
            <button type="submit" disabled={!stripe} style={styles.button}>
                Pay Now
            </button>
        </form>
    );
};

const styles = {
    form: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardElement: {
        padding: '10px',
        fontSize: '16px',
        marginTop: '5px',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default CheckoutForm;
