import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiBarChart2, FiLogOut, FiBell } from 'react-icons/fi';

const AdminNavbar = ({ adminData }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('userData');
            navigate('/login');
        }
    };

    const isActive = (path) => {
        return location.pathname === path ? 'bg-gray-700' : '';
    };

    const NavLink = ({ to, icon: Icon, text }) => (
        <Link 
            to={to} 
            className={`flex items-center space-x-3 px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200 ${isActive(to)}`}
        >
            <Icon className="h-5 w-5 min-w-[20px]" />
            <span className="text-sm">{text}</span>
        </Link>
    );

    return (
        <nav className="bg-gray-800 text-white h-screen w-64 flex flex-col fixed left-0 top-0 z-40 transition-transform duration-300 transform md:translate-x-0">
            {/* Admin Profile Section - Only visible on desktop */}
            <div className="p-6 border-b border-gray-700 hidden md:block">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-lg font-semibold">
                        {adminData?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-semibold truncate">{adminData?.name}</h2>
                        <p className="text-sm text-gray-400">Administrator</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area - Scrollable */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Navigation Links */}
                <div className="flex-none p-4">
                    <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Main Navigation
                    </h3>
                    <div className="space-y-1">
                        <NavLink to="/admin" icon={FiHome} text="Dashboard" />
                        <NavLink to="/admin/manage-products" icon={FiBox} text="Products" />
                        <NavLink to="/admin/manage-users" icon={FiUsers} text="Users" />
                        <NavLink to="/admin/manage-orders" icon={FiShoppingCart} text="Orders" />
                        <NavLink to="/admin/reports" icon={FiBarChart2} text="Reports" />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex-none p-4 border-t border-gray-700">
                    <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Quick Stats
                    </h3>
                    <div className="space-y-3 px-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Active Users</span>
                            <span className="bg-green-500 px-2 py-1 rounded-full text-xs font-medium">24</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Pending Orders</span>
                            <span className="bg-yellow-500 px-2 py-1 rounded-full text-xs font-medium">12</span>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="flex-none p-4 border-t border-gray-700">
                    <div className="flex items-center justify-between px-2 mb-4">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Notifications
                        </h3>
                        <FiBell className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-3 px-2 text-sm text-gray-300">
                        <div className="flex items-start space-x-2">
                            <span className="text-lg leading-none">•</span>
                            <p>5 new orders today</p>
                        </div>
                        <div className="flex items-start space-x-2">
                            <span className="text-lg leading-none">•</span>
                            <p>Low stock alert: 3 items</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Actions - Fixed at Bottom */}
            <div className="flex-none p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 rounded-md hover:bg-gray-700 text-red-400 hover:text-red-300 transition duration-200"
                >
                    <FiLogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default AdminNavbar;