import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiStar, FiClock, FiPlus } from 'react-icons/fi';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        restaurantAPI.getById(id),
        restaurantAPI.getMenu(id)
      ]);
      setRestaurant(restaurantRes.data);
      setMenu(menuRes.data);
    } catch (error) {
      toast.error('Failed to load restaurant details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item, restaurant);
    toast.success(`${item.name} added to cart!`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!restaurant) return <div className="loading">Restaurant not found</div>;

  return (
    <div className="restaurant-detail">
      <div className="restaurant-header">
        <img src={restaurant.imageUrl || 'https://via.placeholder.com/1200x400'} alt={restaurant.name} />
        <div className="restaurant-header-info container">
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <div className="restaurant-stats">
            <span><FiStar /> {restaurant.rating.toFixed(1)}</span>
            <span><FiClock /> {restaurant.deliveryTime} min</span>
            <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="menu-title">Menu</h2>
        <div className="menu-grid">
          {menu.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.imageUrl || 'https://via.placeholder.com/200'} alt={item.name} />
              <div className="menu-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-item-footer">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <button onClick={() => handleAddToCart(item)} className="add-btn">
                    <FiPlus /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
