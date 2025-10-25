import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";
import { section } from "framer-motion/client";

const cartData = [
  {
    _id: "1",
    vendor: { full_name: "Vendor1" },
    service_name: "Decoration",
    final_price: 1800,
    quantity: 1,
  },
  {
    _id: "2",
    vendor: { full_name: "Vendor2" },
    service_name: "Photography",
    final_price: 2500,
    quantity: 1,
  },
  {
    _id: "3",
    vendor: { full_name: "Vendor3" },
    service_name: "Catering",
    final_price: 4000,
    quantity: 1,
  },
  {
    _id: "4",
    vendor: { full_name: "Vendor4" },
    service_name: "Lighting",
    final_price: 1500,
    quantity: 2,
  },
];

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || cartData
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleRemove = (id) =>
    setCartItems((prev) => prev.filter((item) => item._id !== id));

  const handleCheckout = () => navigate("/dashboard/book-order");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );

  const { bgPage, cardBg, textPrimary, textSecondary, buttonHover, imgBg, cartButton, sectionBg } = useThemeClasses();

  return (
    <motion.div
      layout
      className={`p-4 md:p-8 ${sectionBg} min-h-screen flex flex-col`}
    >
      <h2
        className={`text-3xl font-semibold mb-6 ${textPrimary} text-center`}
      >
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center h-64 ${textSecondary}`}
        >
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
                  className={`${cardBg} p-5 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-5`}
                >
                  <div className="flex flex-col">
                    <h3 className={`font-semibold text-lg ${textPrimary}`}>
                      {item.service_name}
                    </h3>
                    <p className={`text-sm ${textSecondary} mt-1`}>
                      Vendor: {item.vendor.full_name}
                    </p>
                    <p className={`text-sm font-medium ${textPrimary} mt-1`}>
                      Price: ₹{item.final_price}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
                    <div
                      className={`flex items-center rounded-lg px-2 py-1 ${imgBg}`}
                    >
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, "decrease")
                        }
                        className={`p-2 rounded-lg transition ${buttonHover}`}
                      >
                        <Minus size={18} className={textPrimary} />
                      </button>
                      <span className={`px-3 font-medium ${textPrimary}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, "increase")
                        }
                        className={`p-2 rounded-lg transition ${buttonHover}`}
                      >
                        <Plus size={18} className={textPrimary} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item._id)}
                      className={`p-2 text-red-500 ${cartButton} rounded-lg transition`}
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
          <div
            className={`${cardBg} mt-8 mb-10 p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4`}
          >
            <h3 className={`text-xl font-semibold ${textPrimary}`}>
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