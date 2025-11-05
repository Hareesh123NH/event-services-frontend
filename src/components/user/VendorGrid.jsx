import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Filters from "../dashboardUtils/Filters";
import { useNavigate } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 👈 Add this at the top


export const handleCart = (vendorItem) => {

  // Create a cart item object
  const cartItem = {
    _id: vendorItem._id,
    vendor: { full_name: vendorItem.vendor.full_name },
    service_name: vendorItem.service.service_name,
    final_price: vendorItem.final_price,
    quantity: 1,
  };

  // Get existing cart from localStorage (if any)
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if item already exists in cart
  const existingItemIndex = existingCart.findIndex(
    (item) => item._id === cartItem._id
  );

  if (existingItemIndex !== -1) {
    // Increase quantity if it already exists
    existingCart[existingItemIndex].quantity += 1;
  } else {
    // Otherwise, add new item
    existingCart.push(cartItem);
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(existingCart));

  // Optional: show confirmation (toast, alert, etc.)
  alert(`${vendorItem.service.service_name} added to cart!`);
};

const VendorGrid = () => {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLastPage, setIsLastPage] = useState(false);
  const [maxDistance, setMaxDistance] = useState(sessionStorage.getItem("maxDistance")|| 10);
  const [coords, setCoords] = useState(JSON.parse(localStorage.getItem("coords")));
  const [loading, setLoading] = useState(false); // ✅ shimmer control
  const addressId = localStorage.getItem("addressId");
  const [useLocation, setUseLocation] = useState(true);


  useEffect(() => {

    if (useLocation && !coords) {
      setLoading(true);
      return;
    }

    const query = activeFilter === "All" ? "" : activeFilter;
    const cacheName = "vendor-cache-v1";
    const cacheKey = `/user/services?query=${query}&page=${page}&limit=${limit}&maxDistance=${maxDistance}${useLocation ? `&coords=${JSON.stringify(coords)}` : `addressId=${addressId}`}`;

    let refreshInterval;

    const fetchServices = async (forceRefresh = false) => {
      setLoading(true);
      try {
        const cache = await caches.open(cacheName);

        // 1️⃣ Try to read from cache first
        if (!forceRefresh) {
          const cachedResponse = await cache.match(cacheKey);
          if (cachedResponse) {
            console.log("⚡ Loaded vendors from cache");
            const cachedData = await cachedResponse.json();
            setVendors(cachedData.data);
            setIsLastPage(cachedData.pagination.isLastPage);
            setLoading(false);
            // setMaxDistance(cachedData.maxDistance);
            // setUseLocation(cachedData.useLocation);
            return;
          }
        }

        // 2️⃣ Always fetch new data to refresh cache
        const response = await api.post(
          "/user/services",
          useLocation ? { coords } : {}, // 👈 only include coords if using location
          {
            params: {
              query,
              page,
              limit,
              maxDistance,
              ...(useLocation ? {} : { addressId }), // 👈 include addressId only if NOT using location
            },
          }
        );


        const data = response.data.data || [];
        const pagenation = response.data.pagination;
        setPage(pagenation.page);
        setIsLastPage(pagenation.isLastPage);
        setVendors(data);

        // 3️⃣ Store in cache
        const cacheBody = new Response(JSON.stringify({ ...response.data, maxDistance, useLocation }), {
          headers: { "Content-Type": "application/json" },
        });
        await cache.put(cacheKey, cacheBody);

        console.log(forceRefresh ? "♻️ Cache refreshed" : "🧠 Cached vendors");
      } catch (err) {
        console.error("Error fetching services:", err);
        if (forceRefresh) setVendors([]);
      } finally {
        setLoading(false);
      }
    };

    // 🔹 Initial load
    fetchServices(false);

    // 🔹 Auto-refresh every 10 minutes
    refreshInterval = setInterval(() => {
      console.log("⏰ Auto-refreshing vendor data...");
      fetchServices(true);
    }, 10 * 60 * 1000);


    // 🔹 Clear cache when window reloads or closes
    const clearCache = async () => {
      console.log("🧹 Clearing vendor cache (reload/close)");
      await caches.delete(cacheName);
    };
    window.addEventListener("beforeunload", clearCache);
    window.addEventListener("unload", clearCache);

    // 🧹 Cleanup
    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener("beforeunload", clearCache);
      window.removeEventListener("unload", clearCache);
    };
  }, [coords, activeFilter, page, limit, maxDistance, addressId, useLocation]);


  const {
    pageBg,
    cardBg,
    borderColor,
    textPrimary,
    textSecondary,
    buttonBlue,
    buttonGreen,
  } = useThemeClasses();

  // 🔹 Shimmer skeleton component
  const ShimmerCard = () => (
    <div
      className={`rounded-xl shadow border ${cardBg} p-3 animate-pulse`}
    >
      <div className="h-4 bg-gray-400/30 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-gray-400/20 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-400/20 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-400/20 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-gray-400/20 rounded mt-3"></div>
    </div>
  );

  return (
    <>
      <Filters activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        useLocation={useLocation}
        setUseLocation={setUseLocation}
        setCoords={setCoords}
      />

      <motion.div
        layout
        className={`p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 overflow-y-auto ${pageBg}`}
      >
        {loading ? (
          // 🔹 Show shimmer placeholders
          Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)
        ) : vendors.length === 0 ? (
          // 🔹 Empty state message
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-center">
            <p className={`text-sm sm:text-base ${textSecondary}`}>
              🚫 No nearest vendors found.
            </p>
          </div>
        ) : (
          vendors.map((vendorItem) => (
            <motion.div
              key={vendorItem._id}
              layout
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl shadow hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between border ${cardBg}`}
              onClick={() => navigate(`/dashboard/detail/${vendorItem._id}`)}
            >
              {/* Vendor Info */}
              <div className="p-3 flex-1">
                <h3
                  className={`font-semibold text-sm sm:text-base md:text-lg ${textPrimary}`}
                >
                  {vendorItem.vendor.full_name}
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${textSecondary}`}>
                  Service: {vendorItem.service.service_name}
                </p>
                <p
                  className={`text-[10px] sm:text-xs mt-1 line-clamp-2 ${textSecondary}`}
                >
                  {vendorItem.service.description}
                </p>
                <p
                  className={`text-xs sm:text-sm font-medium mt-2 ${textPrimary}`}
                >
                  Price: ₹{vendorItem.final_price}
                </p>
                <p className={`text-[10px] sm:text-xs mt-1 ${textSecondary}`}>
                  Rating: {vendorItem.average_rating} ⭐ | Bookings:{" "}
                  {vendorItem.total_bookings}
                </p>
                <p className={`text-[10px] sm:text-xs mt-1 ${textSecondary}`}>
                  Distance: {parseInt(vendorItem.distance / 1000)} km
                </p>
                <p className={`text-[10px] sm:text-xs mt-1 ${textSecondary}`}>
                  Contact: {vendorItem.vendor.phone_number}
                </p>
              </div>

              {/* Buttons */}
              <div className={`p-2 sm:p-3 border-t flex gap-2 ${borderColor}`}>
                <button
                  className={`flex-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-sm transition ${buttonBlue}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCart(vendorItem);
                  }}
                >
                  Add Service
                </button>
                <button
                  className={`flex-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-[10px] sm:text-sm transition ${buttonGreen}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/book-order");
                  }}
                >
                  Order 
                </button>
              </div>
            </motion.div>

          ))
        )}
      </motion.div>

      {/* Pagination Controls */}
      {vendors.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6 mb-4">

          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm sm:text-base ${borderColor} ${textPrimary} ${page === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            disabled={page === 1}
            onClick={() => {
              setIsLastPage(false);
              setPage((p) => Math.max(1, p - 1));
            }}
          >
            <ChevronLeft size={18} />
            Prev
          </button>

          <span className={`text-xs sm:text-sm ${textSecondary}`}>
            Page {page}
          </span>

          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm sm:text-base ${borderColor} ${textPrimary} ${isLastPage
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            disabled={isLastPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      )}


    </>
  );
};

export default VendorGrid;
