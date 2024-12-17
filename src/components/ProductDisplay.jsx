import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductDisplay = () => {
    const [products, setProducts] = useState([]);

    // Fetch products using Axios
    useEffect(() => {
        axios
            .get("http://localhost:5000/products") // Fetch data from JSON Server
            .then((response) => setProducts(response.data)) // Set response data to state
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4"
                        >
                            {/* Product Image with Link */}
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.model}
                                    className="rounded-t-lg w-full h-48 object-contain"
                                />
                            </Link>

                            {/* Product Info */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {product.model}
                                </h3>
                                <p className="text-gray-500">${product.price}</p>

                                {/* Add to Cart Button */}
                                <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
