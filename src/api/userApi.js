import axios from "axios";

const USER_URL = "https://e-com-app-server.onrender.com/users";
const ORDER_URL = "https://e-com-app-server.onrender.com/orders";

// Check if a username already exists
export const checkUsername = async (username) => {
  const res = await axios.get(`${USER_URL}?username=${username}`);
  return res.data.length > 0;
};

// Add a new user
export const addUser = async (userData) => {
  const res = await axios.post(USER_URL, userData);
  return res.data;
};

// Check if user credentials (email and password) match
export const checkUser = async (email, password) => {
  const res = await axios.get(`${USER_URL}?email=${email}&password=${password}`);
  return res.data[0] || null; // Returns the first user found or null if no match
};

// Fetch all users
export const getAllUsers = async () => {
  const res = await axios.get(USER_URL);
  return res;
};

// Fetch user by ID
export const getUserById = async (userId) => {
  const res = await axios.get(`${USER_URL}/${userId}`);
  return res.data;
};

// Fetch user by email (useful for login or profile management)
export const getUserByEmail = async (email) => {
  const res = await axios.get(`${USER_URL}?email=${email}`);
  return res.data[0] || null; // Returns the first user found or null if no match
};

// Get all orders by user ID
export const getAllOrdersByUserId = async (userId) => {
  const res = await axios.get(`${ORDER_URL}?userId=${userId}`);
  return res.data;
};

// Add a new order
export const addToOrders = async (orderData) => {
  return await axios.post(ORDER_URL, orderData);
};

// Update user information (e.g., password, name)
export const updateUser = async (userId, updatedData) => {
  const res = await axios.put(`${USER_URL}/${userId}`, updatedData);
  return res.data;
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  const res = await axios.delete(`${USER_URL}/${userId}`);
  return res.data;
};

// Fetch all orders
// export const getAllOrders = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:5001/orders?email=${email}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       throw error;
//     }
//   };
  