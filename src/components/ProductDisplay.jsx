
import React, { useState } from "react";


const ProductDisplay = () => {
    const products = [
        {
            id: 1,
            name: "Samsung Galaxy S23",
            price: "$799",
            image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-140900/Samsung-Galaxy-S23_-featured-image-packshot-review.jpg",
        },
        {
            id: 2,
            name: "iPhone 14 Pro",
            price: "$999",
            image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-126771/Apple-iPhone-14-Pro_FINAL_featured-image-packshot-review-1.jpg",
        },
        {
            id: 3,
            name: "OnePlus 11",
            price: "$699",
            image: "https://oasis.opstatics.com/content/dam/oasis/page/2023/na/oneplus-11/specs/green-img.png",
        },
        {
            id: 4,
            name: "Xiaomi 13 Pro",
            price: "$599",
            image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-139229/Xiaomi-13-Pro_featured-image-packshot-review-Recovered.jpg",
        },
        {
            id: 5,
            name: "Samsung Galaxy S24 Ultra",
            price: "$999",
            image: "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg",
        },
        {
            id: 6,
            name: "ASUS ROG Phone 8 Pro",
            price: "$899",
            image: "https://dlcdnwebimgs.asus.com/gain/ABFC8538-7C78-41CE-A04D-41D2EC316710/w1000/h732",
        },
        {
            id: 7,
            name: "IQOO 12 Pro",
            price: "$599",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2RQj_Jro1K4S6zf_PxRevu2xzOlviRrKQgQ&s",
        },
        {
            id: 8,
            name: "Realme 12 Pro",
            price: "$599",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcnrnu7x5DaB6ATqrvtxKz1xxKQZ1VJ45vA&s",
        },
    ];

   // State to keep track of the cart items
   const [cart, setCart] = useState([]);

   // Function to handle adding products to the cart
   const addToCart = (product) => {
       setCart((prevCart) => {
           // Check if the product is already in the cart
           const existingProduct = prevCart.find((item) => item.id === product.id);
           if (existingProduct) {
               // Update the quantity if the product is already in the cart
               return prevCart.map((item) =>
                   item.id === product.id
                       ? { ...item, quantity: item.quantity + 1 }
                       : item
               );
           } else {
               // Add the product to the cart with quantity 1 if not already in the cart
               return [...prevCart, { ...product, quantity: 1 }];
           }
       });
   };

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
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col"
                        >
                            {/* Uniform Image Styling */}
                            <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-grow mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500">{product.price}</p>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
