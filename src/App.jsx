// import './App.css';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
// import Home from './features/user/s/Home';



// function App() {
//   return (
//     <div className="App">
//         <Navbar/>
//         <Home/>
//         <Footer/>
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// // Import shared components
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// // Import User components
// import UserRouter from './features/user/UserRouter';

// // Import Admin components
// import AdminRouter from './features/admin/AdminRouter';

// // Main App Component
// const App = () => {
//     return (
//         <Router>
//             <div className="flex flex-col min-h-screen">
//                 {/* Navbar */}
//                 <Navbar />

//                 {/* Main Content */}
//                 <div className="flex-1">
//                     <Routes>
//                         {/* User Routes */}
//                         <Route path="/*" element={<UserRouter />} />

//                         {/* Admin Routes */}
//                         <Route path="/admin/*" element={<AdminRouter />} />
//                     </Routes>
//                 </div>

//                 {/* Footer */}
//                 <Footer />
//             </div>
//         </Router>
//     );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import shared components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import User components
import Home from './features/user/pages/Home';  // Assuming you have a Home component
import ProductDisplay from './components/ProductDisplay';  // Assuming you have a ProductDisplay component
import Cart from './features/user/pages/Cart';  // Assuming you have a Cart component
import Login from './components/LoginPage';  // Assuming you have a Login component
import Signup from './components/SignupPage';  // Assuming you have a Signup component

// Import Admin components
import AdminRouter from './features/admin/AdminRouter';

const App = () => {
    // Simulating user authentication status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar isLoggedIn={isLoggedIn} />

                {/* Main Content */}
                <div className="flex-1">
                    <Routes>
                        {/* User Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductDisplay />} />
                        <Route path="/cart" element={isLoggedIn ? <Cart /> : <Login />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Admin Routes */}
                        <Route path="/admin/*" element={<AdminRouter />} />
                    </Routes>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
};

export default App;
