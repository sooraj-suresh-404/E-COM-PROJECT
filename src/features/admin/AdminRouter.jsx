import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminProtector from '../../components/AdminProtector';
import AdminNavbar from '../../components/AdminNavbar';
import Dashboard from './pages/Dashboard';
import ManageOrders from './pages/ManageOders';
import ManageProducts from './pages/ManageProducts';
import ManageUser from './pages/ManageUser';
import Report from './pages/Report';

const AdminRouter = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const adminData = JSON.parse(localStorage.getItem('userData'));

    return (
        <AdminProtector>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar - controlled by state on mobile */}
                <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <AdminNavbar adminData={adminData} />
                </div>

                {/* Mobile navbar */}
                <div className="md:hidden fixed top-0 left-0 right-0 z-50">
                    <div className="bg-gray-800 text-white p-4">
                        {/* Profile and Menu Row */}
                        <div className="flex items-center justify-between mb-2">
                            {/* Admin Profile for Mobile */}
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold">
                                    {adminData?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-sm truncate">{adminData?.name}</h2>
                                    <p className="text-xs text-gray-400">Administrator</p>
                                </div>
                            </div>

                            {/* Menu Toggle Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d={isMobileMenuOpen 
                                            ? "M6 18L18 6M6 6l12 12" 
                                            : "M4 6h16M4 12h16M4 18h16"
                                        } 
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Overlay for mobile menu */}
                {isMobileMenuOpen && (
                    <div 
                        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 md:ml-64">
                    <div className="md:hidden h-20"></div>
                    <div className="p-4 md:p-8">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/manage-orders" element={<ManageOrders />} />
                            <Route path="/manage-products" element={<ManageProducts />} />
                            <Route path="/manage-users" element={<ManageUser />} />
                            <Route path="/reports" element={<Report />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </AdminProtector>
    );
};

export default AdminRouter;