// src/components/ProductDisplay.jsx
import React from "react";

const ProductDisplay = () => {
    const products = [
        {
            id: 1,
            name: "Samsung Galaxy S23",
            price: "$799",
            image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-140900/Samsung-Galaxy-S23_-featured-image-packshot-review.jpg", // Replace with product images
        },
        {
            id: 2,
            name: "iPhone 14 Pro",
            price: "$999",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "OnePlus 11",
            price: "$699",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Xiaomi 13 Pro",
            price: "$599",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 1,
            name: "Samsung Galaxy S23",
            price: "$799",
            image: "https://via.placeholder.com/150", // Replace with product images
        },
        {
            id: 2,
            name: "iPhone 14 Pro",
            price: "$999",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "OnePlus 11",
            price: "$699",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Xiaomi 13 Pro",
            price: "$599",
            image: "https://via.placeholder.com/150",
        },
        // Add more products as needed
    ];

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Heading */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Featured Products
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4"
                        >
                            {/* Product Image */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-t-lg w-full h-48 object-cover"
                            />

                            {/* Product Info */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500">{product.price}</p>

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
