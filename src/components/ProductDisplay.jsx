import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useCart } from "../contexts/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // For Like/Unlike icons
import { getallProducts } from "../api/productApi";
import axios from "axios";
import { useUser } from "../contexts/UserContext"; // Import useUser context

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const [likedProducts, setLikedProducts] = useState([]);
  const { email } = useUser(); // Get the user email (logged-in check)
  const navigate = useNavigate(); // Initialize navigate

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products: ", error);
        setError("Error fetching product details");
      }
    };

    fetchProducts();

    // Retrieve liked products from localStorage
    const storedLikes = JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(storedLikes);
  }, []);

  // Handle like button click
  const handleLike = (productId) => {
    let updatedLikes;
    if (likedProducts.includes(productId)) {
      updatedLikes = likedProducts.filter((id) => id !== productId); // Remove from likes
    } else {
      updatedLikes = [...likedProducts, productId]; // Add to likes
    }

    setLikedProducts(updatedLikes);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes)); // Store in localStorage
  };

  // Handle add to cart button click
  const handleAddToCart = (product) => {
    if (!email) {
      // If the user is not logged in, show an alert and redirect to login
      alert("Please log in to add items to the cart.");
      navigate("/login");
    } else {
      // If the user is logged in, add product to cart
      addToCart(product);
      alert(`Added ${product.model} to the cart!`);
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 relative hover:shadow-xl transform transition duration-300 hover:scale-105"
              >
                {product.image ? (
                  <Link
                    to={`/product/${product.id}`}
                    className="block"
                    aria-label={`View details of ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-t-lg w-full h-48 object-contain"
                    />
                  </Link>
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">No Image</span>
                  </div>
                )}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-700">{product.model}</h3>
                  {/* <p className="text-gray-500">{product.}</p> */}
                  <p className="text-gray-500">${product.price}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span key={index}>
                          {index < Math.floor(product.rating) ? "★" : "☆"}
                        </span>
                      ))}
                    </span>
                    <span className="ml-2 text-gray-500">({product.rating} stars)</span>
                  </div>
                  <p className="text-gray-500 mt-2">{product.description}</p>
                  <button
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product); // Use the new handleAddToCart function
                    }}
                  >
                    Add to Cart
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(product.id)}
                    className="absolute top-2 right-2 text-xl p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
                  >
                    {likedProducts.includes(product.id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg text-center col-span-4">No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
