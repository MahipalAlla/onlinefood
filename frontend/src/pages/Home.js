import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import RestaurantCard from '../components/RestaurantCard';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
    } catch (error) {
      toast.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchRestaurants();
      return;
    }
    try {
      const response = await restaurantAPI.search(searchQuery);
      setRestaurants(response.data);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h1>Order Food Online</h1>
          <p>Delicious meals delivered to your doorstep</p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Popular Restaurants</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
