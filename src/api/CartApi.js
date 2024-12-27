// CartApi.js
const API_URL = "https://e-com-app-server.onrender.com/users";

export const fetchCart = async (email) => {
  try {
    const response = await fetch(`${API_URL}?email=${email}`);
    const data = await response.json();
    if (data.length > 0) {
      return data[0].cart || [];
    }
    throw new Error("User not found");
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const updateUserCart = async (userId, updatedCart) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: updatedCart }),
    });
    if (response.ok) {
      return true;
    }
    throw new Error("Error updating cart");
  } catch (error) {
    console.error("Error updating cart:", error);
    return false;
  }
};

export const addToCartApi = async (email, product) => {
  try {
    const userResponse = await fetch(`${API_URL}?email=${email}`);
    const data = await userResponse.json();
    if (data.length > 0) {
      const user = data[0];
      const updatedCart = [...user.cart, { ...product, quantity: 1 }];
      const updateResponse = await updateUserCart(user.id, updatedCart);
      if (updateResponse) {
        return updatedCart;
      }
    }
    throw new Error("User not found or failed to update cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
    return [];
  }
};

export const removeFromCartApi = async (email, productId) => {
  try {
    const userResponse = await fetch(`${API_URL}?email=${email}`);
    const data = await userResponse.json();
    if (data.length > 0) {
      const user = data[0];
      const updatedCart = user.cart.filter((item) => item.id !== productId);
      const updateResponse = await updateUserCart(user.id, updatedCart);
      if (updateResponse) {
        return updatedCart;
      }
    }
    throw new Error("User not found or failed to remove item");
  } catch (error) {
    console.error("Error removing from cart:", error);
    return [];
  }
};

export const clearCartApi = async (email) => {
  try {
    const userResponse = await fetch(`${API_URL}?email=${email}`);
    const data = await userResponse.json();
    if (data.length > 0) {
      const user = data[0];
      const updateResponse = await updateUserCart(user.id, []);
      if (updateResponse) {
        return [];
      }
    }
    throw new Error("User not found or failed to clear cart");
  } catch (error) {
    console.error("Error clearing cart:", error);
    return [];
  }
};

export const updateQuantityApi = async (email, productId, amount) => {
  try {
    const userResponse = await fetch(`${API_URL}?email=${email}`);
    const data = await userResponse.json();
    if (data.length > 0) {
      const user = data[0];
      const updatedCart = user.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + amount } : item
      );
      const updateResponse = await updateUserCart(user.id, updatedCart);
      if (updateResponse) {
        return updatedCart;
      }
    }
    throw new Error("User not found or failed to update quantity");
  } catch (error) {
    console.error("Error updating quantity:", error);
    return [];
  }
};
