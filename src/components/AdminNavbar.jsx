import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => (
    <nav className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto p-4 flex items-center justify-center">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            {/* Optional: You can add a logout button or other items here */}
        </div>
        <div className="flex flex-col-r gap-2 p-4 items-center justify-center">
            <Link 
                to="/admin/dashboard" 
                className="block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Dashboard
            </Link>
            <Link 
                to="/admin/manage-products" 
                className="block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Manage Products
            </Link>
            <Link 
                to="/admin/manage-users" 
                className="block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Manage Users
            </Link>
            <Link 
                to="/admin/manage-orders" 
                className="block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Manage oders
            </Link>
            <Link 
                to="/admin/reports" 
                className="block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                Reports
            </Link>
        </div>
    </nav>
);

export default AdminNavbar;
