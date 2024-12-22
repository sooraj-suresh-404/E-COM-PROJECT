// import axios from "axios";

// const USER_URL = "http://localhost:3000/users";
// const ORDER_URL = "http://localhost:5001/orders";

// export const checkUsername= async (username)=>{
//     const res = await axios.get(`${USER_URL}?username=${username}`);
//     return res.data.length>0;
// }

// export const addUser=async (userData)=>{
//     const res = await axios.post(USER_URL,userData);
//     return res.data;
// }

// export const checkUser= async (username,password)=>{
//     const res = await axios.get(`${USER_URL}?username=${username}&password=${password}`);
//     return res.data;
// }

// export const getUserById = async (userId)=>{
//     const res = await axios.get(`${USER_URL}/${userId}`);
//     return res.data;
// }

// export const getAllOrdersByUserId = async (userId) => {
//     const res = await axios.get(`${ORDER_URL}?userId=${userId}`)
//     return res.data;
// }

// export const addToOrders = async (orderData) => {
//     return await axios.post(ORDER_URL, orderData)
// }