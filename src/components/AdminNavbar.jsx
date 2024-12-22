import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? 'bg-gray-700' : '';
    };

    return (
        <nav className="h-full text-white">
            {/* Admin Header */}
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-center">Admin Panel</h2>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col p-4 space-y-2">
                <Link 
                    to="/admin" 
                    className={`px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ${isActive('/admin')}`}>
                    Dashboard
                </Link>
                <Link 
                    to="/admin/manage-products" 
                    className={`px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ${isActive('/admin/manage-products')}`}>
                    Manage Products
                </Link>
                <Link 
                    to="/admin/manage-users" 
                    className={`px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ${isActive('/admin/manage-users')}`}>
                    Manage Users
                </Link>
                <Link 
                    to="/admin/manage-orders" 
                    className={`px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ${isActive('/admin/manage-orders')}`}>
                    Manage Orders
                </Link>
                <Link 
                    to="/admin/reports" 
                    className={`px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 ${isActive('/admin/reports')}`}>
                    Reports
                </Link>
            </div>
        </nav>
    );
};

export default AdminNavbar;
