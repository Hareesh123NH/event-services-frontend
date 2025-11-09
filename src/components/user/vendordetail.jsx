import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { handleCart } from "./VendorGrid";
import { CheckCircle, PlusCircle } from "lucide-react";
import { filtersList } from "../data/duplicatedata";
import logo from "/ES_logo.png"

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


  const matchedFilter = filtersList.find(
    (f) => f.title.toLowerCase() === vendorItem?.service.service_name.toLowerCase()
  );

  const serviceImage = matchedFilter?.image || logo;

  const {
    pageBg,
    cardBg,
    textPrimary,
    textSecondary,
    borderColor,
  } = useThemeClasses();



  if (!vendorItem)
    return (
      <div className={`rounded-2xl shadow-md border ${cardBg} p-4 sm:p-6 animate-pulse`}>
        {/* Header shimmer */}
        <div className="flex justify-between items-center border-b pb-3 mb-4 border-gray-500/20">
          <div className="space-y-2 w-2/3">
            <div className="h-5 bg-gray-400/30 rounded w-1/2"></div>
            <div className="h-3 bg-gray-400/30 rounded w-1/3"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-400/30 rounded"></div>
            <div className="h-6 w-20 bg-gray-400/30 rounded"></div>
          </div>
        </div>

        {/* Image shimmer */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-3 bg-gray-400/30 rounded w-full"></div>
            ))}
          </div>
          <div className="w-full md:w-60 lg:w-72 h-48 sm:h-56 md:h-64 bg-gray-400/30 rounded-2xl"></div>
        </div>
      </div>
    );


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
            {/* Add Service Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleCart(vendorItem);
              }}
              className="flex-1 flex items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-sm bg-blue-200 hover:bg-blue-300 text-blue-800 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4 mr-1" />
              AddService
            </motion.button>

            {/* Order Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                handleCart(vendorItem);
                navigate("/dashboard/book-order");
              }}
              className="flex-1 flex items-center justify-center px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-sm bg-green-200 hover:bg-green-300 text-green-800 shadow-sm transition-all"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Order
            </motion.button>
          </div>
        </div>

        {/* Main Content - Info + Image */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          {/* Left side: Details */}
          <div className="flex-1 text-xs sm:text-sm">
            {/* Vendor Info */}
            <div className="mb-5 sm:mb-6">
              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
                Vendor Details
              </h3>
              <p><strong>Email:</strong> {vendorItem.vendor.email}</p>
              <p><strong>Phone:</strong> {vendorItem.vendor.phone_number}</p>
              <p><strong>Description:</strong> {vendorItem.vendor.description}</p>
              <p><strong>Address:</strong> {vendorItem.vendor.address}</p>
            </div>

            {/* Service Info */}
            <div className="mb-5 sm:mb-6">
              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
                Service Details
              </h3>
              <p><strong>Name:</strong> {vendorItem.service.service_name}</p>
              <p><strong>Description:</strong> {vendorItem.service.description}</p>
              <p><strong>Base Price:</strong> ₹{vendorItem.service.base_price}</p>
              <p><strong>Pricing Type:</strong> {vendorItem.service.pricing_type}</p>
            </div>

            {/* Pricing Summary */}
            <div className="mb-5 sm:mb-6">
              <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
                Pricing Summary
              </h3>
              <p><strong>Price:</strong> ₹{vendorItem.price}</p>
              <p><strong>Discount:</strong> {vendorItem.discount}%</p>
              <p><strong>Final Price:</strong> ₹{vendorItem.final_price}</p>
            </div>

            {/* Addons */}
            {vendorItem.addons.length > 0 && (
              <div className="mb-5 sm:mb-6">
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
              <div className="mb-5 sm:mb-6">
                <h3 className={`text-base sm:text-lg font-semibold mb-2 ${textSecondary}`}>
                  Notes
                </h3>
                <p className={textSecondary}>{vendorItem.notes}</p>
              </div>
            )}

            {/* Ratings & Bookings */}
            <div>
              <p><strong>Average Rating:</strong> {vendorItem.average_rating} ⭐</p>
              <p><strong>Total Bookings:</strong> {vendorItem.total_bookings}</p>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="flex-shrink-0 w-full md:w-60 lg:w-72">
            <img
              src={serviceImage}
              alt={vendorItem.vendor.full_name}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-2xl border border-white/20 shadow-md"
              onError={(e) => (e.currentTarget.src = logo)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );

};

export default VendorDetail;
