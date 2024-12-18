import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import AdminRouter from './features/admin/AdminRouter';
import UserRouter from './features/user/UserRouter';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';

const App = () => {
    return (
        <UserProvider>
            <CartProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <div className="flex-1">
                            <Routes>
                                <Route path="/*" element={<UserRouter />} />
                                <Route path="/admin/*" element={<AdminRouter />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </UserProvider>
    );
};

export default App;
