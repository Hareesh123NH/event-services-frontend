import React, { useState } from "react";
import { motion } from "framer-motion";

import {  mockVendors } from "../data/duplicatedata";
import Filters from "./Filters";
import { Outlet, useNavigate } from "react-router-dom";

const VendorGrid = () => {
  const navigate = useNavigate();
  const vendors = mockVendors;
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <>
      <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <motion.div
        layout
        className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto"
      >
        {vendors
          // .filter((v) =>
          //   v.vendor.full_name.toLowerCase().includes(search.toLowerCase())
          // )
          .map((vendorItem) => (
            <motion.div
              key={vendorItem._id}
              layout
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between"
              onClick={() => {
                navigate(`/dashboard/detail/${vendorItem._id}`)
              }}
            >
              <div className="p-3 flex-1">
                <h3 className="font-semibold text-lg">
                  {vendorItem.vendor.full_name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Service: {vendorItem.service.service_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {vendorItem.service.description}
                </p>
                <p className="text-sm font-medium mt-2">
                  Price: ₹{vendorItem.final_price}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Rating: {vendorItem.average_rating} ⭐ | Bookings:{" "}
                  {vendorItem.total_bookings}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Distance: {vendorItem.distance} km
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Contact: {vendorItem.vendor.phone_number}
                </p>
              </div>

              {/* Fixed bottom buttons */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                <button
                  className="flex-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/cart");
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
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
