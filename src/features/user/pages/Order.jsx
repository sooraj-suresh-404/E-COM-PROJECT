import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../contexts/UserContext"; // Assuming UserContext provides email

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { email } = useUser(); // Fetch logged-in user email

  useEffect(() => {
    const fetchOrders = async () => {
      if (!email) {
        setError("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/orders?email=${email}`
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  if (loading)
    return <p className="text-center my-10 text-lg">Loading your orders...</p>;
  if (error)
    return <p className="text-center my-10 text-red-500 font-semibold">{error}</p>;

  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        My Orders
      </h2>

      <div className="space-y-8">
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-md p-6"
            >
              {/* Order Details */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Order ID: #{order.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on: {order.date} {order.time || ""}
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    Status: Delivered
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  Total: ${order.total}
                </p>
              </div>

              {/* Items Section */}
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 mb-4 border-b pb-4"
                >
                  <img
                    src={item.image || "/placeholder.jpg"} // Fallback image
                    alt={item.model || "Product"}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex-grow">
                    <h4 className="text-md font-medium text-gray-800">
                      {item.model || "Product Name"}
                    </h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-2xl text-gray-700">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default Order;
