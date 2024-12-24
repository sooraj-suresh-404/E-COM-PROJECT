import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'http://localhost:5001';

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// // Delete a user
// export const deleteUser = async (userId) => {
//   try {
//     await axios.delete(`${BASE_URL}/users/${userId}`);
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw error;
//   }
// };

// Block a user
export const blockUser = async (userId, blockStatus) => {
    try {
      const response = await axios.patch(`${BASE_URL}/users/${userId}`, { block: blockStatus });
      return response.data;
    } catch (error) {
      console.error(`Error ${blockStatus ? 'blocking' : 'unblocking'} user:`, error);
      throw error;
    }
};


export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        return response.data || [];
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
};

export const updateOrderStatus = async (orderId, updatedOrder) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/orders/${orderId}`, updatedOrder);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update order status');
    }
};

export const deleteOrder = async (orderId) => {
    try {
        await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
    } catch (error) {
        throw new Error('Failed to delete order');
    }
};