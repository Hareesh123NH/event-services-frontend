import React, { useState, useContext } from "react";
import { motion } from "framer-motion";

import { mockVendors } from "../data/duplicatedata";
import Filters from "../dashboardUtils/Filters";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const VendorGrid = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // 'light' or 'dark'
  const vendors = mockVendors;
  const [activeFilter, setActiveFilter] = useState("All");

  // Theme classes
  const pageBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900";
  const cardBg = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-500";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-900";
  const buttonBlue = theme === "dark" ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-500 hover:bg-blue-600 text-white";
  const buttonGreen = theme === "dark" ? "bg-green-700 hover:bg-green-800 text-white" : "bg-green-500 hover:bg-green-600 text-white";

  return (
    <>
      <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <motion.div
        layout
        className={`p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto ${pageBg}`}
      >
        {vendors.map((vendorItem) => (
          <motion.div
            key={vendorItem._id}
            layout
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl shadow hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between border ${cardBg}`}
            onClick={() => {
              navigate(`/dashboard/detail/${vendorItem._id}`);
            }}
          >
            <div className="p-3 flex-1">
              <h3 className={`font-semibold text-lg ${textPrimary}`}>
                {vendorItem.vendor.full_name}
              </h3>
              <p className={`text-sm mt-1 ${textSecondary}`}>
                Service: {vendorItem.service.service_name}
              </p>
              <p className={`text-xs mt-1 line-clamp-2 ${textSecondary}`}>
                {vendorItem.service.description}
              </p>
              <p className={`text-sm font-medium mt-2 ${textPrimary}`}>
                Price: ₹{vendorItem.final_price}
              </p>
              <p className={`text-xs mt-1 ${textSecondary}`}>
                Rating: {vendorItem.average_rating} ⭐ | Bookings: {vendorItem.total_bookings}
              </p>
              <p className={`text-xs mt-1 ${textSecondary}`}>
                Distance: {vendorItem.distance} km
              </p>
              <p className={`text-xs mt-1 ${textSecondary}`}>
                Contact: {vendorItem.vendor.phone_number}
              </p>
            </div>

            {/* Fixed bottom buttons */}
            <div className={`p-3 border-t flex gap-2 ${borderColor}`}>
              <button
                className={`flex-1 px-3 py-1 rounded transition ${buttonBlue}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/dashboard/cart");
                }}
              >
                Add to Cart
              </button>
              <button
                className={`flex-1 px-3 py-1 rounded transition ${buttonGreen}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/dashboard/book-order");
                }}
              >
                Book
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default VendorGrid;
