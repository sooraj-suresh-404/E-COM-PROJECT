import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../contexts/CartContext";
import { useUser } from "../../../contexts/UserContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { email } = useUser();
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("");
  
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

    try {
      const response = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        alert(`Order placed successfully with ${selectedPayment}!`);
        clearCart();
        navigate("/orders");
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Address Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Shipping Address</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={address.name}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-semibold">City</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="City"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-semibold">State</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="State"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-semibold">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Postal Code"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-semibold">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Middle Column: Order Summary */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                {cart.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p>₹{product.price} x {product.quantity}</p>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">
                      ₹{product.price * product.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-xl font-semibold">Total Amount</span>
                <span className="text-xl font-semibold">${getTotalPrice()}</span>
              </div>
            </div>

            {/* Right Column: Payment Methods */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Payment Method</h3>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="Credit Card"
                      checked={selectedPayment === "Credit Card"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-lg">Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="Debit Card"
                      checked={selectedPayment === "Debit Card"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-lg">Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="PayPal"
                      checked={selectedPayment === "PayPal"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-lg">PayPal</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value="Cash on Delivery"
                      checked={selectedPayment === "Cash on Delivery"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="w-5 h-5"
                    />
                    <span className="text-lg">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleOrderConfirmation}
                  className="w-full lg:w-40 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Confirm Order
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full lg:w-40 bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Back to Cart
                </button>
              </div>
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
