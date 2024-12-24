import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { useUser } from "../../../contexts/UserContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { email } = useUser();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);

  // Address form state
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrderConfirmation = async () => {
    if (!selectedPayment) {
      alert("Please select a payment method to proceed.");
      return;
    }
    if (Object.values(address).includes("")) {
      alert("Please fill in your address details.");
      return;
    }

    const orderDetails = {
      email,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: getTotalPrice(),
      paymentMethod: selectedPayment,
      shippingAddress: address,
      date: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/orders");
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Address */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Shipping Address</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <form className="space-y-4">
                  {["name", "street", "city", "state", "postalCode"].map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-semibold capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={address[field]}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder={`Enter your ${field}`}
                      />
                    </div>
                  ))}
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                {cart.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 border-b pb-4">
                    <img
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm">₹{product.price} x {product.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-6">
                  <span className="text-xl font-semibold">Total Amount</span>
                  <span className="text-xl font-semibold">${getTotalPrice()}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Payment Method</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                {["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"].map(
                  (method, index) => (
                    <label key={index} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        value={method}
                        checked={selectedPayment === method}
                        onChange={() => setSelectedPayment(method)}
                        className="w-5 h-5"
                      />
                      <span className="text-lg">{method}</span>
                    </label>
                  )
                )}
              </div>
              <button
                onClick={handleOrderConfirmation}
                className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition ${
                  loading ? "opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Confirm Order"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">Your cart is empty. Add some items to checkout.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
