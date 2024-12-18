import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // Fetch cart items on component mount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:5002/cart");
                setCartItems(response.data);
                calculateTotal(response.data);
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };
        fetchCart();
    }, []);

    // Calculate the total amount of the cart
    const calculateTotal = (items) => {
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    // Handle item removal
    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5002/cart/${id}`);
            // After removal, update the cart items in the state
            const updatedCart = cartItems.filter((item) => item.id !== id);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    // Handle clear cart
    const handleClearCart = async () => {
        try {
            await axios.delete("http://localhost:5002/cart"); // Clear all items
            setCartItems([]);
            setTotal(0);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    // Handle quantity change (increase or decrease)
    const handleQuantityChange = async (id, change) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                const updatedQuantity = item.quantity + change;
                if (updatedQuantity > 0) {
                    item.quantity = updatedQuantity;
                }
            }
            return item;
        });

        setCartItems(updatedCart);
        calculateTotal(updatedCart);

        try {
            await axios.put(`http://localhost:5002/cart/${id}`, {
                quantity: updatedCart.find((item) => item.id === id).quantity,
            });
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // Proceed to checkout
    const handleCheckout = () => {
        navigate("/checkout", { state: { cartItems, total } });
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-center mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-md shadow-md mb-4 flex justify-between items-center"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-gray-500">${item.price}</p>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                            className="text-xl font-bold text-gray-600"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                            className="text-xl font-bold text-gray-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="bg-white p-4 rounded-md shadow-md mt-6 flex justify-between items-center">
                        <span className="font-semibold text-lg">Total: ${total}</span>
                        <div>
                            <button
                                onClick={handleClearCart}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-4"
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
