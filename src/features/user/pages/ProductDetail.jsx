import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { useUser } from "../../../contexts/UserContext";
import { getProductById } from "../../../api/productApi";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { email } = useUser(); // Get the logged-in user’s email from UserContext
  const navigate = useNavigate(); // Navigate function to redirect user

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id); // Pass the product ID
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Buy Now functionality
  const buyNow = () => {
    if (!email) {
      alert("Please log in to buy the product.");
      navigate("/login"); // Redirect to login page
      return;
    }
    if (!product) return;
    console.log("Redirecting to checkout with:", product);
  };

  // Handle Add to Cart functionality
  const handleAddToCart = () => {
    if (!email) {
      alert("Please log in to add the product to the cart.");
      navigate("/login"); // Redirect to login page
      return;
    }
    addToCart(product);
    alert(`Added ${product.model} to the cart!`);
  };

  if (loading) return <p className="text-center my-10">Loading...</p>;
  if (error) return <p className="text-center my-10 text-red-500">{error}</p>;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-500">★</span>);
    }
    if (halfStar) {
      stars.push(<span key="half" className="text-yellow-500">☆</span>);
    }
    while (stars.length < 5) {
      stars.push(<span key={`empty-${stars.length}`} className="text-gray-300">★</span>);
    }
    return stars;
  };

  return (
    <div className="container mx-auto py-8 px-4 m-20">
      <div className="flex flex-col md:flex-row md:space-x-8 m-5">
        {/* Product Image Section */}
        <div className="flex-1 md:w-2/5">
          <div className="relative w-full h-[300px] md:h-[550px]">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.model || "Product"}
              className="w-full h-full object-contain rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.jpg";
              }}
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex-1 mt-6 md:mt-0 md:w-3/5">
          <h2 className="text-3xl font-bold text-gray-800">{product.model || "Unknown Model"}</h2>
          <p className="text-xl text-gray-600 mt-2">{product.brand || "Unknown Brand"}</p>
          <p className="text-2xl text-green-600 mt-4">${product.price || "0.00"}</p>

          {/* Rating */}
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-gray-600">({product.rating || 0} )</span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Description</h3>
            <p className="text-gray-600 mt-2">{product.description || "No description available."}</p>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 ? (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Specifications</h3>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <li key={index}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">No specifications available.</h3>
            </div>
          )}

          {/* Add to Cart and Buy Now Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4">
            <button
              className="w-full sm:w-[150px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition mb-4 sm:mb-0"
              onClick={handleAddToCart} // Handle Add to Cart with login check
            >
              Add to Cart
            </button>
            <button
              className="w-full sm:w-[150px] bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
              onClick={buyNow} // Handle Buy Now with login check
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
