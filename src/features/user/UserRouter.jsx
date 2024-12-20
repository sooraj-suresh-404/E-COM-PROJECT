import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from '../../components/Navbar';
import Login from '../../components/LoginPage';
import Signup from '../../components/SignupPage';
import OrderSection from './pages/Order';

// Ensure imports are correct and remove any unused ones
// import ProductDisplay from './components/ProductDisplay'; 

function UserRouter({ isLoggedIn, isAdmin }) {
  return (
    <div className="user-layout">
      {/* Pass the props to the Navbar component */}
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderSection />} />

          {/* Handle non-existent routes */}
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </div>
  );
}

export default UserRouter;
