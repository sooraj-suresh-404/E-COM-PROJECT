import React, { useState, useEffect } from "react";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const userStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(userStatus === "true");

        // Get cart count from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartCount(cartItems.length);
    }, []);  // Empty dependency array to run only on mount

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <nav className="max-w-8xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <a href="/">E-Shop</a>
                </div>

                {/* Search Bar */}
                <div className="hidden sm:flex flex-1 mx-4 max-w-3xl">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Icons and Profile */}
                <div className="flex items-center space-x-4">
                    {/* Cart Icon */}
                    <a href="/cart" className="relative hover:text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m2-8h10m-2 8a1 1 0 102 0m-10 0a1 1 0 102 0"
                            />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    </a>

                    {/* Login Button or Profile Icon */}
                    {!isLoggedIn ? (
                        <a
                            href="/login"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition"
                        >
                            Login
                        </a>
                    ) : (
                        <div className="relative group">
                            <div className="cursor-pointer flex items-center space-x-2">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                                    alt="Profile"
                                    className="rounded-full w-8 h-8"
                                />
                                <span className="hidden sm:inline">Profile</span>
                            </div>
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <a
                                    href="/profile"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    My Profile
                                </a>
                                <a
                                    href="/orders"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    My Orders
                                </a>
                                <a
                                    href="/logout"
                                    className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Search Bar for Mobile */}
            <div className="sm:hidden bg-blue-600 p-2">
                <input
                    type="text"
                    placeholder="Search products.."
                    className="w-full rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
        </header>
    );
};

export default Navbar;
