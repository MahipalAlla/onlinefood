import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          🍕 FoodApp
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/restaurants" className="nav-link">Restaurants</Link>
          
          {user ? (
            <>
              <Link to="/orders" className="nav-link">My Orders</Link>
              <Link to="/cart" className="nav-link cart-link">
                <FiShoppingCart />
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </Link>
              <div className="user-menu">
                <FiUser />
                <span>{user.fullName}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <FiLogOut /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
