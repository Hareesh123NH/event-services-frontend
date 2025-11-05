import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { handleCart } from "./VendorGrid";

const VendorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vendorItem, setVendorItem] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await api.get(`/user/vendor-service/${id}`); // remove colon
        setVendorItem(res.data.data);
      } catch (err) {
        console.error("Error fetching vendor:", err);
      }
    };

    fetchVendor();
  }, []);


  const {
    pageBg,
    cardBg,
    textPrimary,
    textSecondary,
    borderColor,
    buttonBlue,
    buttonGreen,
    backBtn,
  } = useThemeClasses();

  if (!vendorItem)
    return (
      <div
        className={`rounded-xl shadow border ${cardBg} p-3 animate-pulse`}
      >
        <div className="h-4 bg-gray-400/30 rounded w-2/3 mb-2"></div>
      </div>)

  return (
    <div className={`flex-1 overflow-y-auto p-3 sm:p-4 ${pageBg}`}>
      <motion.div
        layout
        className={`p-4 sm:p-6 w-full rounded-2xl shadow-md border ${cardBg}`}
      >


        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between border-b pb-3 sm:pb-4 mb-4 ${borderColor}`}
        >
          <div>
            <h2 className={`text-lg sm:text-xl md:text-2xl font-bold ${textPrimary}`}>
              {vendorItem.vendor.full_name}
            </h2>
            <p className={`text-xs sm:text-sm ${textSecondary}`}>
              <strong>Status:</strong> {vendorItem.status}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 md:mt-0">
            <button
              onClick={() => handleCart(vendorItem)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition ${buttonBlue}`}
            >
              Add Service
            </button>
            <button
              onClick={() => navigate("/dashboard/book-order")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition ${buttonGreen}`}
            >
              Order Now
            </button>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition ${backBtn}`}
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Vendor Info */}
        <div className="mb-5 sm:mb-6 text-xs sm:text-sm">
          <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
            Vendor Details
          </h3>
          <p><strong>Email:</strong> {vendorItem.vendor.email}</p>
          <p><strong>Phone:</strong> {vendorItem.vendor.phone_number}</p>
          <p><strong>Description:</strong> {vendorItem.vendor.description}</p>
          <p><strong>Address:</strong> {vendorItem.vendor.address}</p>
        </div>

        {/* Service Info */}
        <div className="mb-5 sm:mb-6 text-xs sm:text-sm">
          <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
            Service Details
          </h3>
          <p><strong>Name:</strong> {vendorItem.service.service_name}</p>
          <p><strong>Description:</strong> {vendorItem.service.description}</p>
          <p><strong>Base Price:</strong> ₹{vendorItem.service.base_price}</p>
          <p><strong>Pricing Type:</strong> {vendorItem.service.pricing_type}</p>
        </div>

        {/* Pricing Summary */}
        <div className="mb-5 sm:mb-6 text-xs sm:text-sm">
          <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
            Pricing Summary
          </h3>
          <p><strong>Price:</strong> ₹{vendorItem.price}</p>
          <p><strong>Discount:</strong> {vendorItem.discount}%</p>
          <p><strong>Final Price:</strong> ₹{vendorItem.final_price}</p>
        </div>

        {/* Addons */}
        {vendorItem.addons.length > 0 && (
          <div className="mb-5 sm:mb-6 text-xs sm:text-sm">
            <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
              Addons
            </h3>
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
          <div className="mb-5 sm:mb-6 text-xs sm:text-sm">
            <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
              Notes
            </h3>
            <p className={textSecondary}>{vendorItem.notes}</p>
          </div>
        )}

        {/* Ratings & Bookings */}
        <div className="text-xs sm:text-sm">
          <p><strong>Average Rating:</strong> {vendorItem.average_rating} ⭐</p>
          <p><strong>Total Bookings:</strong> {vendorItem.total_bookings}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorDetail;
