import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import AdminRouter from './features/admin/AdminRouter';
import UserRouter from './features/user/UserRouter';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <AuthProvider>
                    <CartProvider>
                        <div className="flex flex-col min-h-screen">
                            <div className="flex-1">
                                <Routes>
                                    <Route path="/*" element={<UserRouter />} />
                                    <Route path="/admin/*" element={<AdminRouter />} />
                                </Routes>
                            </div>
                            <Footer />
                        </div>
                    </CartProvider>
                </AuthProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
