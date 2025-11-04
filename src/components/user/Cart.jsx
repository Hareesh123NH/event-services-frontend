import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";

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

  const {
    cardBg,
    textPrimary,
    textSecondary,
    buttonHover,
    imgBg,
    cartButton,
    sectionBg,
  } = useThemeClasses();

  return (
    <div className={`relative flex flex-col h-full ${sectionBg} overflow-hidden`}>
      {/* Fixed Header */}
      <div
        className={`p-3 sm:p-4 border-b ${cardBg} ${textPrimary} text-center sticky top-0 z-10`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold">🛒 Your Cart</h2>
      </div>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 space-y-2 sm:space-y-3">
        {cartItems.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-full ${textSecondary}`}
          >
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <motion.div
              key={item._id}
              layout
              whileHover={{ scale: 1.01 }}
              className={`${cardBg} p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between`}
            >
              <div className="flex flex-col">
                <h3
                  className={`font-semibold text-base sm:text-lg ${textPrimary}`}
                >
                  {item.service_name}
                </h3>
                <p className={`text-xs sm:text-sm ${textSecondary}`}>
                  Vendor: {item.vendor.full_name}
                </p>
                <p
                  className={`text-sm sm:text-base font-medium ${textPrimary}`}
                >
                  Price: ₹{item.final_price}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-center gap-3 sm:gap-4">
                <div
                  className={`flex items-center rounded-lg px-2 sm:px-3 py-1 ${imgBg}`}
                >
                  <button
                    onClick={() => handleQuantityChange(item._id, "decrease")}
                    className={`p-1 sm:p-2 rounded-lg transition ${buttonHover}`}
                  >
                    <Minus size={16} className={textPrimary} />
                  </button>
                  <span
                    className={`px-2 sm:px-3 font-medium text-sm sm:text-base ${textPrimary}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item._id, "increase")}
                    className={`p-1 sm:p-2 rounded-lg transition ${buttonHover}`}
                  >
                    <Plus size={16} className={textPrimary} />
                  </button>
                </div>

                <button
                  onClick={() => handleRemove(item._id)}
                  className={`p-1.5 sm:p-2 text-red-500 ${cartButton} rounded-lg transition`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Fixed Total */}
      <div
        className={`${cardBg} border-t p-3 sm:p-4 flex items-center justify-between sticky bottom-0 z-10`}
      >
        <h3 className={`text-lg sm:text-xl font-semibold ${textPrimary}`}>
          Total: ₹{totalPrice}
        </h3>
        <button
          className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-600 transition font-medium text-sm sm:text-base"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );


};

export default Cart;
