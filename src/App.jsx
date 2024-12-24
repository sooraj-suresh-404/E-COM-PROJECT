import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import AdminRouter from './features/admin/AdminRouter';
import UserRouter from './features/user/UserRouter';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import PageNotFound from './components/NotFound';

const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <AuthProvider>
                    <CartProvider>
                            <Routes>
                                <Route path="/*" element={<UserRouter />} />
                                <Route path="/admin/*" element={<AdminRouter />} />
                                                {/* Handle non-existent routes */}
                                <Route path="*" element={<PageNotFound/>} />
                            </Routes>
                    </CartProvider>
                </AuthProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
