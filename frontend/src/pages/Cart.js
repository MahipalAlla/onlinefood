import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { cart, restaurant, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error('Please enter delivery address');
      return;
    }

    try {
      const orderData = {
        restaurantId: restaurant.id,
        items: cart.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        })),
        deliveryAddress
      };

      const response = await orderAPI.create(orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/checkout/${response.data.id}`);
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn-primary">
          Browse Restaurants
        </button>
      </div>
    );
  }

  const subtotal = getTotal();
  const deliveryFee = restaurant?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="container cart-page">
      <h1>Your Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          <h3>From {restaurant?.name}</h3>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <FiMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <FiPlus />
                </button>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="delivery-address">
            <label>Delivery Address</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
          </div>

          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
