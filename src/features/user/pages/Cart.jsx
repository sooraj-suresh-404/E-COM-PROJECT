import React from "react";
import { useCart } from "../../../contexts/CartContext";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "../../../contexts/UserContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, addToCart } = useCart();
  const navigate = useNavigate();
  const { email } = useUser();

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If item exists, increase its quantity
      updateQuantity(item.id, 1);
    } else {
      // If item doesn't exist, add it to the cart
      addToCart(item);
    }
  };

  if (!email) return <p className="text-center text-gray-500">Please log in to view your cart.</p>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-between h-[70vh]">
          <p className="text-center text-gray-500 text-3xl m-10">Your cart is empty. Start shopping!</p>
          <img src="   https://cdn-icons-png.flaticon.com/512/13637/13637462.png " alt="Empty Cart" className="mx-auto h-[350px] pt-10" />
        </div>
        

      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-lg mb-6 flex justify-between items-center hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="font-medium text-xl text-gray-800">{item.name}</h3>
                  <p className="text-lg text-gray-600">${item.price}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-xl font-semibold text-gray-600 hover:text-gray-800 transition"
                    >
                      -
                    </button>
                    <span className="text-lg text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-xl font-semibold text-gray-600 hover:text-gray-800 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center mt-8">
            <span className="font-semibold text-xl text-gray-800">Total: ${getTotalPrice()}</span>
            <div>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white py-2 px-6 rounded-lg mr-4 hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
