import React from "react";
import { motion } from "framer-motion";

const VendorDetail = ({ vendorItem }) => {
  if (!vendorItem) return <p>Loading vendor details...</p>;

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <motion.div
        layout
        className="p-6 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md"
      >
        {/* Header: Vendor Name + Status + Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {vendorItem.vendor.full_name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <strong>Status:</strong> {vendorItem.status}
            </p>
          </div>

          {/* Buttons on top-right */}
          <div className="flex gap-3 mt-3 md:mt-0">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              Book Now
            </button>
          </div>
        </div>

        {/* Vendor Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Vendor Details
          </h3>
          <p><strong>Email:</strong> {vendorItem.vendor.email}</p>
          <p><strong>Phone:</strong> {vendorItem.vendor.phone_number}</p>
          <p><strong>Description:</strong> {vendorItem.vendor.description}</p>
          <p><strong>Address:</strong> {vendorItem.vendor.address}</p>
        </div>

        {/* Service Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Service Details
          </h3>
          <p><strong>Name:</strong> {vendorItem.service.service_name}</p>
          <p><strong>Description:</strong> {vendorItem.service.description}</p>
          <p><strong>Base Price:</strong> ₹{vendorItem.service.base_price}</p>
          <p><strong>Pricing Type:</strong> {vendorItem.service.pricing_type}</p>
        </div>

        {/* Pricing Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Pricing Summary
          </h3>
          <p><strong>Price:</strong> ₹{vendorItem.price}</p>
          <p><strong>Discount:</strong> {vendorItem.discount}%</p>
          <p><strong>Final Price:</strong> ₹{vendorItem.final_price}</p>
        </div>

        {/* Addons */}
        {vendorItem.addons.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Addons
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              {vendorItem.addons.map((addon, idx) => (
                <li key={idx}>
                  {addon.title} - ₹{addon.price} ({addon.description})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        {vendorItem.notes && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{vendorItem.notes}</p>
          </div>
        )}

        {/* Ratings & Bookings */}
        <div className="mb-6">
          <p><strong>Average Rating:</strong> {vendorItem.average_rating} ⭐</p>
          <p><strong>Total Bookings:</strong> {vendorItem.total_bookings}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorDetail;
