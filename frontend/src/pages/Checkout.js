import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { orderAPI, paymentAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Checkout.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { data } = await paymentAPI.createIntent({
        orderId: order.id,
        amount: order.totalAmount
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        await paymentAPI.confirm(order.id, result.paymentIntent.id);
        toast.success('Payment successful!');
        navigate('/orders');
      }
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="card-element">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' }
            }
          }
        }} />
      </div>
      <button type="submit" disabled={!stripe || processing} className="pay-btn">
        {processing ? 'Processing...' : `Pay $${order.totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getById(orderId);
      setOrder(response.data);
    } catch (error) {
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!order) return <div className="loading">Order not found</div>;

  return (
    <div className="container checkout-page">
      <h1>Complete Payment</h1>
      <div className="checkout-content">
        <div className="order-summary-card">
          <h3>Order Summary</h3>
          <div className="order-items">
            {order.orderItems.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.menuItem.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-card">
          <h3>Payment Details</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
