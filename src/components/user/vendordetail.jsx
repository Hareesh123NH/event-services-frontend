import React from "react";
import { motion } from "framer-motion";
import { vendorServiceDetails } from "../data/duplicatedata";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";

const VendorDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const vendorItem = vendorServiceDetails.data;
  if (!vendorItem) return <p>Loading vendor details...</p>;

  const { pageBg, cardBg, textPrimary, textSecondary, borderColor, buttonBlue, buttonGreen, backBtn } = useThemeClasses();

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${pageBg}`}>
      <motion.div
        layout
        className={`p-6 w-full rounded-2xl shadow-md border ${cardBg}`}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-4 px-4 py-2 rounded transition ${backBtn}`}
        >
          ← Back
        </button>

        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4 ${borderColor}`}>
          <div>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>
              {vendorItem.vendor.full_name}
            </h2>
            <p className={`text-sm ${textSecondary}`}>
              <strong>Status:</strong> {vendorItem.status}
            </p>
          </div>

          <div className="flex gap-3 mt-3 md:mt-0">
            <button
              onClick={() => navigate("/dashboard/cart")}
              className={`px-4 py-2 rounded-lg transition ${buttonBlue}`}
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate("/dashboard/book-order")}
              className={`px-4 py-2 rounded-lg transition ${buttonGreen}`}
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Vendor Info */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${textSecondary}`}>Vendor Details</h3>
          <p><strong>Email:</strong> {vendorItem.vendor.email}</p>
          <p><strong>Phone:</strong> {vendorItem.vendor.phone_number}</p>
          <p><strong>Description:</strong> {vendorItem.vendor.description}</p>
          <p><strong>Address:</strong> {vendorItem.vendor.address}</p>
        </div>

        {/* Service Info */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${textSecondary}`}>Service Details</h3>
          <p><strong>Name:</strong> {vendorItem.service.service_name}</p>
          <p><strong>Description:</strong> {vendorItem.service.description}</p>
          <p><strong>Base Price:</strong> ₹{vendorItem.service.base_price}</p>
          <p><strong>Pricing Type:</strong> {vendorItem.service.pricing_type}</p>
        </div>

        {/* Pricing Summary */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-2 ${textSecondary}`}>Pricing Summary</h3>
          <p><strong>Price:</strong> ₹{vendorItem.price}</p>
          <p><strong>Discount:</strong> {vendorItem.discount}%</p>
          <p><strong>Final Price:</strong> ₹{vendorItem.final_price}</p>
        </div>

        {/* Addons */}
        {vendorItem.addons.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${textSecondary}`}>Addons</h3>
            <ul className={`list-disc list-inside ${textSecondary}`}>
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
            <h3 className={`text-lg font-semibold mb-2 ${textSecondary}`}>Notes</h3>
            <p className={textSecondary}>{vendorItem.notes}</p>
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
