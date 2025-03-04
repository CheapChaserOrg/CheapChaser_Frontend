import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

const PaymentPage = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Complete Your Payment</h2>
            {/* CheckoutForm can access Stripe context provided by Elements */}
            <CheckoutForm />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    heading: {
        color: '#4f9c8e',
        fontSize: '28px',
        marginBottom: '20px',
    }
};

export default PaymentPage;
