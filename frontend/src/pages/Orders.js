import React, { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <FiClock />;
      case 'CONFIRMED': return <FiCheckCircle />;
      case 'PREPARING': return <FiCheckCircle />;
      case 'OUT_FOR_DELIVERY': return <FiTruck />;
      case 'DELIVERED': return <FiCheckCircle />;
      default: return <FiClock />;
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders yet</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>{order.restaurant.name}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="order-items">
                {order.orderItems.map(item => (
                  <div key={item.id} className="order-item">
                    <span>{item.menuItem.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="order-total">Total: ${order.totalAmount.toFixed(2)}</span>
                <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
