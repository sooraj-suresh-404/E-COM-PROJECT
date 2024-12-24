import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useUser } from "./UserContext";
import * as CartApi from "../api/CartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { email } = useUser();

  useEffect(() => {
    if (email) {
      const fetchData = async () => {
        const fetchedCart = await CartApi.fetchCart(email);
        setCart(fetchedCart);
      };
      fetchData();
    } else {
      setCart([]);
    }
  }, [email]);

  const addToCart = async (product) => {
    if (!email) {
      console.error("User not logged in");
      return;
    }
    const updatedCart = await CartApi.addToCartApi(email, product);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const removeFromCart = async (productId) => {
    if (!email) {
      console.error("User not logged in");
      return;
    }
    const updatedCart = await CartApi.removeFromCartApi(email, productId);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const clearCart = async () => {
    if (!email) {
      console.error("User not logged in");
      return;
    }
    const updatedCart = await CartApi.clearCartApi(email);
    setCart(updatedCart);
  };

  const updateQuantity = async (productId, amount) => {
    if (!email) {
      console.error("User not logged in");
      return;
    }
    const updatedCart = await CartApi.updateQuantityApi(email, productId, amount);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const placeOrder = (orderDetails) => {
    setOrders((prevOrders) => [...prevOrders, orderDetails]);
    clearCart(); // Clear cart after placing order
  };

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    orders,
    placeOrder,
  }), [cart, orders]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
