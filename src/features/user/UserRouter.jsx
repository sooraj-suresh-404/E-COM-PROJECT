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
import Footer from '../../components/Footer';

// Ensure imports are correct and remove any unused ones
// import ProductDisplay from './components/ProductDisplay'; 

function UserRouter({ isLoggedIn, isAdmin }) {
  return (
    <div className="user-layout">
      {/* Pass the props to the Navbar component */}
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderSection />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserRouter;
