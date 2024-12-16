import React from "react";

const Cart = () => {
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-4">Your Cart</h2>

            {/* Empty Cart Message */}
            <div className="text-center text-gray-500">
                <p>Your cart is empty.</p>
            </div>

            {/* Cart Items (Add items dynamically here) */}
            <div className="bg-white p-4 rounded-md shadow-md space-y-4 mt-6">
                {/* Product Item */}
                <div className="flex justify-between items-center py-3 border-b">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://cdn.dxomark.com/wp-content/uploads/medias/post-140900/Samsung-Galaxy-S23_-featured-image-packshot-review.jpg"
                            alt="Samsung Galaxy S23"
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">Samsung Galaxy S23</h3>
                            <p className="text-gray-500">$799</p>
                            <p className="text-gray-500">Qty: 1</p>
                        </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">Remove</button>
                </div>

                {/* Product Item */}
                <div className="flex justify-between items-center py-3 border-b">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://cdn.dxomark.com/wp-content/uploads/medias/post-126771/Apple-iPhone-14-Pro_FINAL_featured-image-packshot-review-1.jpg"
                            alt="iPhone 14 Pro"
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">iPhone 14 Pro</h3>
                            <p className="text-gray-500">$999</p>
                            <p className="text-gray-500">Qty: 1</p>
                        </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">Remove</button>
                </div>

                {/* Product Item */}
                <div className="flex justify-between items-center py-3 border-b">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://cdn.dxomark.com/wp-content/uploads/medias/post-139229/Xiaomi-13-Pro_featured-image-packshot-review-Recovered.jpg"
                            alt="Xiaomi 13 Pro"
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">Xiaomi 13 Pro</h3>
                            <p className="text-gray-500">$599</p>
                            <p className="text-gray-500">Qty: 1</p>
                        </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600">Remove</button>
                </div>
            </div>

            {/* Total and Actions */}
            <div className="bg-white p-4 rounded-md shadow-md mt-6 flex justify-between items-center">
                <span className="font-semibold text-lg">Total: $2397</span>
                <div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4">Clear Cart</button>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg">Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
