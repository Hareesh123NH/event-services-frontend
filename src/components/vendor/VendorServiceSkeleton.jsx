import React from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";

const VendorServiceBlockShimmer = ({ index = 0 }) => {
  const { bgCard, borderColor } = useThemeClasses();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`shadow-md rounded-2xl border ${borderColor} p-4 sm:p-6 ${bgCard} animate-pulse`}
    >
      {/* Header skeleton */}
      <div className="h-6 w-2/3 bg-gray-400/30 rounded mb-4"></div>

      {/* Base price / final price */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-1/3 bg-gray-400/20 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-400/20 rounded"></div>
      </div>

      {/* Rating & tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 w-20 bg-gray-400/20 rounded"></div>
        ))}
      </div>

      {/* Input fields shimmer */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-4">
          <div className="h-4 w-24 bg-gray-400/20 rounded mb-2"></div>
          <div className="h-9 w-full bg-gray-400/20 rounded"></div>
        </div>
      ))}

      {/* Add-ons shimmer */}
      <div className="mb-6">
        <div className="h-4 w-24 bg-gray-400/20 rounded mb-3"></div>
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`p-3 border ${borderColor} rounded-lg bg-gray-400/10 space-y-2`}
            >
              <div className="h-4 w-1/3 bg-gray-400/20 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-400/20 rounded"></div>
              <div className="h-10 w-full bg-gray-400/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Save button shimmer */}
      <div className="w-full sm:w-32 h-9 bg-gray-400/30 rounded-lg mx-auto"></div>
    </motion.div>
  );
};

export default VendorServiceBlockShimmer;
