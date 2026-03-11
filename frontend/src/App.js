import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="loading">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/restaurants" element={<Home />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:orderId" element={
                <PrivateRoute><Checkout /></PrivateRoute>
              } />
              <Route path="/orders" element={
                <PrivateRoute><Orders /></PrivateRoute>
              } />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
