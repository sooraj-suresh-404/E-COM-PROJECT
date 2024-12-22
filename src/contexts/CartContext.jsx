import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

// Create CartContext
const CartContext = createContext();

// CartProvider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const { email } = useUser();

  // Fetch cart items from the database on component mount or when email changes
  useEffect(() => {
    if (email) {
      fetch(`http://localhost:3000/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setCart(data[0].cart || []);
          } else {
            console.error("User not found");
          }
        })
        .catch((err) => console.error("Error fetching cart data:", err));
    } else {
      setCart([]);
    }
  }, [email]);

  const addToCart = (product) => {
    if (!email) {
      console.error("User not logged in");
      return;
    }

    fetch(`http://localhost:3000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          const updatedCart = [...user.cart, { ...product, quantity: 1 }];

          return fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: updatedCart }),
          });
        } else {
          console.error("User not found");
        }
      })
      .then(() => {
        setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  const removeFromCart = (productId) => {
    if (!email) {
      console.error("User not logged in");
      return;
    }

    fetch(`http://localhost:3000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          const updatedCart = user.cart.filter((item) => item.id !== productId);

          return fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: updatedCart }),
          });
        } else {
          console.error("User not found");
        }
      })
      .then(() => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      })
      .catch((err) => console.error("Error removing from cart:", err));
  };

  const clearCart = () => {
    if (!email) {
      console.error("User not logged in");
      return;
    }

    fetch(`http://localhost:3000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];

          return fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: [] }),
          });
        } else {
          console.error("User not found");
        }
      })
      .then(() => setCart([]))
      .catch((err) => console.error("Error clearing cart:", err));
  };

  const updateQuantity = (productId, amount) => {
    if (!email) {
      console.error("User not logged in");
      return;
    }

    fetch(`http://localhost:3000/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          const user = data[0];
          const updatedCart = user.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + amount }
              : item
          );

          return fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart: updatedCart }),
          });
        } else {
          console.error("User not found");
        }
      })
      .then(() => {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + amount }
              : item
          )
        );
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const placeOrder = (orderDetails) => {
    setOrders((prevOrders) => [...prevOrders, orderDetails]);
    clearCart(); // Clear cart after placing order
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for ease of use
export const useCart = () => useContext(CartContext);
