import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const cartData = [
  {
    _id: "1",
    vendor: {
      full_name: "Vendor1",
      email: "vendor1@example.com",
      phone_number: "9876543210",
    },
    service_name: "Decoration",
    final_price: 1800,
    quantity: 1,
  },
  {
    _id: "2",
    vendor: {
      full_name: "Vendor2",
      email: "vendor2@example.com",
      phone_number: "9876543211",
    },
    service_name: "Photography",
    final_price: 2500,
    quantity: 1,
  },
  {
    _id: "3",
    vendor: {
      full_name: "Vendor3",
      email: "vendor3@example.com",
      phone_number: "9876543212",
    },
    service_name: "Catering",
    final_price: 4000,
    quantity: 1,
  },
  {
    _id: "4",
    vendor: {
      full_name: "Vendor3",
      email: "vendor3@example.com",
      phone_number: "9876543212",
    },
    service_name: "Catering",
    final_price: 4000,
    quantity: 1,
  },
  {
    _id: "5",
    vendor: {
      full_name: "Vendor3",
      email: "vendor3@example.com",
      phone_number: "9876543212",
    },
    service_name: "Catering",
    final_price: 4000,
    quantity: 1,
  },
];

const Cart = () => {
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || cartData;

  // Mock data (replace later with backend or context data)
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle increase/decrease quantity
  const handleQuantityChange = (id, action) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  // Remove an item
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Checkout handler
  const handleCheckout = () => {
    // ✅ Store cart items in localStorage
    // localStorage.setItem("cart", JSON.stringify(cartItems));
    // const cart_local = JSON.parse(localStorage.getItem("cart"));
    // console.log(cart_local);

    // Navigate to checkout page
    navigate("/dashboard/book-order");
  };

  // Calculate total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );

  return (
    <motion.div
      layout
      className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col"
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <p className="text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          {/* Scrollable cart items */}
          <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
            <div className="grid gap-4">
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      {item.service_name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Vendor: {item.vendor.full_name}
                    </p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                      Price: ₹{item.final_price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-2 py-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, "decrease")
                        }
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-3 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, "increase")
                        }
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="p-2 text-red-500 hover:text-red-600 bg-red-50 dark:bg-gray-700 rounded-lg hover:bg-red-100 dark:hover:bg-gray-600 transition"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Total & Checkout */}
          <div className="mt-8 mb-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Total: ₹{totalPrice}
            </h3>
            <button
              className="w-full sm:w-auto bg-green-500 text-white px-6 py-2.5 rounded-xl hover:bg-green-600 transition font-medium"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
