import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiStar } from 'react-icons/fi';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <div className="restaurant-card" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
      <div className="restaurant-image">
        <img src={restaurant.imageUrl || 'https://via.placeholder.com/300x200'} alt={restaurant.name} />
        {!restaurant.isOpen && <div className="closed-badge">Closed</div>}
      </div>
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p className="restaurant-description">{restaurant.description}</p>
        <div className="restaurant-meta">
          <span className="rating">
            <FiStar /> {restaurant.rating.toFixed(1)}
          </span>
          <span className="delivery-time">
            <FiClock /> {restaurant.deliveryTime} min
          </span>
          <span className="delivery-fee">${restaurant.deliveryFee.toFixed(2)} delivery</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
