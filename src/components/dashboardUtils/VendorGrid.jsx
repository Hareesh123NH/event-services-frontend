import React from "react";
import { motion } from "framer-motion";

const VendorGrid = ({ vendors, search }) => {
  return (
    <motion.div
      layout
      className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto"
    >
      {vendors
        .filter((v) =>
          v.vendor.full_name.toLowerCase().includes(search.toLowerCase())
        )
        .map((vendorItem) => (
          <motion.div
            key={vendorItem._id}
            layout
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="p-3">
              <h3 className="font-semibold text-lg">{vendorItem.vendor.full_name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Service: {vendorItem.service.service_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {vendorItem.service.description}
              </p>
              <p className="text-sm font-medium mt-2">
                Price: ₹{vendorItem.final_price}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Rating: {vendorItem.average_rating} ⭐ | Bookings: {vendorItem.total_bookings}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Distance: {vendorItem.distance} km
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Contact: {vendorItem.vendor.phone_number}
              </p>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
};

export default VendorGrid;
