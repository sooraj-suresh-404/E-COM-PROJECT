import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

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

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const handleAddToCart = async (item) => {
        try {
            const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

            if (existingItem) {
                // Update quantity if the item is already in the cart
                await axios.put(`http://localhost:5002/cart/${item.id}`, {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                });

                // Optimistically update the cart state (before the response)
                setCartItems((prevCartItems) =>
                    prevCartItems.map((cartItem) =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    )
                );
            } else {
                // Add new item to the cart
                await axios.post("http://localhost:5002/cart", { ...item, quantity: 1 });

                // Optimistically add the new item to the cart state
                setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
            }

            // Recalculate total after adding/updating item
            calculateTotal([...cartItems, { ...item, quantity: 1 }]);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5002/cart/${id}`);
            setCartItems((prevCartItems) => {
                const updatedCart = prevCartItems.filter((item) => item.id !== id);
                calculateTotal(updatedCart);
                return updatedCart;
            });
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete("http://localhost:5002/cart");
            setCartItems([]);
            setTotal(0);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const handleQuantityChange = async (id, change) => {
        const updatedCart = cartItems.map((item) => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });

        setCartItems(updatedCart.filter((item) => item.quantity > 0));
        calculateTotal(updatedCart);

        try {
            const updatedItem = updatedCart.find((item) => item.id === id);
            if (updatedItem) {
                await axios.put(`http://localhost:5002/cart/${id}`, { quantity: updatedItem.quantity });
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                total,
                handleAddToCart, // Add this function to the context
                handleRemoveItem,
                handleClearCart,
                handleQuantityChange,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
