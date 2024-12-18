import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import shared components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import User components
import Home from './features/user/pages/Home';
import ProductDisplay from './components/ProductDisplay';
import Cart from './features/user/pages/Cart';
import Login from './components/LoginPage';
import Signup from './components/SignupPage';

// Import Admin components
import AdminRouter from './features/admin/AdminRouter';

// Import ProductDetails component
import ProductDetails from './features/user/pages/ProductDetail';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the user is logged in and if they are an admin
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            const userData = JSON.parse(user);
            if (userData.isAdmin) {
                setIsAdmin(true);
            }
        }
    }, []);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Render Admin Navbar if Admin, otherwise render User Navbar */}
                <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductDisplay />} />
                        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/admin/*" element={<AdminRouter />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
