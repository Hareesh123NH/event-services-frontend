import React, { useState } from "react";
import { motion } from "framer-motion";

import { mockVendors } from "../data/duplicatedata";
import Filters from "../dashboardUtils/Filters";
import { useNavigate } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";

const VendorGrid = () => {
  const navigate = useNavigate();
  const vendors = mockVendors;
  const [activeFilter, setActiveFilter] = useState("All");

  const { pageBg, cardBg, borderColor, textPrimary, textSecondary, buttonBlue, buttonGreen } = useThemeClasses();

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
