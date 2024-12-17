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

    // Check if the user is already logged in by checking localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar isLoggedIn={isLoggedIn} />
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

// // export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Import shared components
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// // Import User components
// import Home from './features/user/pages/Home';
// import ProductDisplay from './components/ProductDisplay';
// import Cart from './features/user/pages/Cart';
// import Login from './components/LoginPage';
// import Signup from './components/SignupPage';

// // Import Admin components
// import AdminRouter from './features/admin/AdminRouter';

// // Import ProductDetails component
// import ProductDetails from './features/user/pages/ProductDetail';

// // Import CartProvider to wrap the app
// import { CartProvider } from './contexts/CartContext';

// const App = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <CartProvider>
//             <Router>
//                 <div className="flex flex-col min-h-screen">
//                     <Navbar isLoggedIn={isLoggedIn} />
//                     <div className="flex-1">
//                         <Routes>
//                             <Route path="/" element={<Home />} />
//                             <Route path="/products" element={<ProductDisplay />} />
//                             <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login />} />
//                             <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//                             <Route path="/signup" element={<Signup />} />
//                             <Route path="/product/:id" element={<ProductDetails />} />
//                             <Route path="/admin/*" element={<AdminRouter />} />
//                         </Routes>
//                     </div>
//                     <Footer />
//                 </div>
//             </Router>
//         </CartProvider>
//     );
// };

// export default App;
