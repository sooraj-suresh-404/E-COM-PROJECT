import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from '../../components/Navbar';
// Import User components
// import Home from './features/user/pages/Home';
// import ProductDisplay from './components/ProductDisplay';
// import Cart from './features/user/pages/Cart';
import Login from '../../components/LoginPage';
import Signup from '../../components/SignupPage';



const UserRouter = () => {

    return (
        <div className="user-layout">
            <Navbar/>  {/*isLoggedIn={isLoggedIn} isAdmin={isAdmin} /> */}
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/products" element={<ProductList />} /> */}
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserRouter;
