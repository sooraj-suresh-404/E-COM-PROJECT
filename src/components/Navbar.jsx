import React, { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const { email, handleLogout, name } = useUser();
  const { cart } = useCart();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart ? cart.length : 0;

  // Fetch products from the database
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle search input
  const handleSearchInput = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filteredSuggestions = products.filter((product) =>
        product.model?.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setModalOpen(true);
    } else {
      setSuggestions([]);
      setModalOpen(false);
    }
  };

  // Handle cart icon click
  const handleCartClick = () => {
    if (!email) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-8xl mx-auto px-5 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/">E-Shop</NavLink>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 max-w-3xl flex justify-center relative">
          <input
            type="text"
            placeholder="Search Mobile..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="w-full rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />

          {/* Search Modal */}
          {modalOpen && (
            <div className="absolute top-14 w-full bg-white shadow-lg rounded-md p-4 z-10">
              {suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer transition"
                      onClick={() => {
                        setSearchQuery(""); // Clear search
                        setModalOpen(false); // Close modal
                        navigate(`/product/${suggestion.id}`); // Navigate to product page
                      }}
                    >
                      <span className="text-black">{suggestion.model}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Cart Icon */}
          <div
            className="relative hover:text-gray-300"
            onClick={handleCartClick}
          >
            <FiShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile or Login */}
          {email ? (
            <div
              className="relative group cursor-pointer"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  alt="Profile"
                  className="rounded-full w-8 h-8"
                />
                <span className="hidden sm:inline">
                  {name || email.split("@")[0]}
                </span>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-md shadow-lg z-10">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
