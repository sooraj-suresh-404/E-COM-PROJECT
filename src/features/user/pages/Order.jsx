import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5001/orders"); // Modify the URL if needed
        setOrders(response.data); // Set the orders data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center my-10">Loading orders...</p>;
  if (error) return <p className="text-center my-10 text-red-500">{error}</p>;

  return (
    <div className="order-section container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>

      {/* Render the list of orders */}
      <div className="orders-list mt-6">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item border-b py-4">
              <h3 className="text-xl font-semibold text-gray-800">Order #{order.id}</h3>
              <p className="text-gray-600">Status: {order.status}</p>
              <p className="text-gray-600">Total: ${order.total}</p>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center "><h1 className="text-3xl">No orders</h1> </p>
        )}
      </div>
    </div>
  );
};

export default Order;
