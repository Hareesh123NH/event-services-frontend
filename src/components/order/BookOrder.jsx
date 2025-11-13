import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { Check, Loader2, Minus, Plus, Save } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const BookOrder = () => {
  const { search } = useOutletContext();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(
    localStorage.getItem("addressId")
  );
  const [eventDate, setEventDate] = useState("");
  const [cartServices, setCartServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [formData, setFormData] = useState({
    scheduled_from: "",
    scheduled_to: "",
    quantity: activeService?.quantity || 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await api.get("/user/address");
      setAddresses(res.data.addresses);
      if (!selectedAddressId && simplified.length > 0) {
        localStorage.setItem("addressId", simplified[0]._id);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
    setLoadingAddresses(false);
  };

  useEffect(() => {
    fetchAddresses();
    setCartServices(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const filteredAddresses = addresses.filter((addr) => {
    if (!search) return true; // show all if search is empty
    const lowerSearch = search.toLowerCase();
    return [addr.label, addr.address_line1, addr.city, addr.state, addr.country]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(lowerSearch));
  });


  useEffect(() => {
    if (activeService) {
      setFormData({
        scheduled_from: "",
        scheduled_to: "",
        quantity: activeService.quantity || 1,
      });
    }
  }, [activeService]);

  const isFormComplete = () =>
    formData.scheduled_from && formData.scheduled_to && formData.quantity;

  const toggleServiceSelection = (service) => {

    if (activeService && activeService._id !== service._id) {
      if (!isFormComplete()) {
        setSelectedServices((prev) =>
          prev.filter((s) => s.vendorserviceid !== activeService._id)
        );
      }
      setFormData({
        scheduled_from: "",
        scheduled_to: "",
        quantity: service.quantity,
      });
      setActiveService(service);
      return;
    }

    const isAlreadySelected = selectedServices.find(
      (s) => s.vendorserviceid === service._id
    );

    if (isAlreadySelected) {
      setSelectedServices((prev) =>
        prev.filter((s) => s.vendorserviceid !== service._id)
      );
      setActiveService(null);
      setFormData({
        scheduled_from: "",
        scheduled_to: "",
        quantity: service.quantity,
      });
    } else {
      setActiveService(service);
    }
  };

  const handleSaveForm = () => {
    const fromDate = new Date(formData.scheduled_from);
    const toDate = new Date(formData.scheduled_to);

    if (toDate <= fromDate) {
      alert("Scheduled To must be later than Scheduled From.");
      return;
    }

    if (!isFormComplete()) {
      alert("Please fill all fields before saving this service.");
      return;
    }

    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.vendorserviceid === activeService._id);
      if (exists) {
        return prev.map((s) =>
          s.vendorserviceid === activeService._id ? { ...s, ...formData } : s
        );
      } else {
        return [...prev, { vendorserviceid: activeService._id, ...formData }];
      }
    });

    setActiveService(null);
    setFormData({ scheduled_from: "", scheduled_to: "", quantity: 1 });
  };

  const handleSubmit = async () => {
    if (!selectedAddressId || !eventDate) {
      setError("Please select an address and date before booking.");
      return;
    }

    setLoading(true);
    setError(""); // clear previous error

    const orderData = {
      event_addressId: selectedAddressId,
      event_date: eventDate,
      services: selectedServices,
    };

    try {
      const response = await api.post("/order/create", orderData);
      console.log("✅ Order submitted:", response.data);
      localStorage.removeItem("cart");
      sessionStorage.removeItem("user-history");
      alert("Order Booked Successfully!");
      setCartServices([]);
      setSelectedServices([]);
    } catch (error) {
      console.error("❌ Error submitting order:", error);

      // Backend 400 validation errors usually come in error.response
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message || "Invalid input data");
      } else {
        setError("Failed to book order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = selectedServices.reduce((sum, s) => {
    const service = cartServices.find((x) => x._id === s.vendorserviceid);
    return sum + (service?.final_price || 0) * (s.quantity || 1);
  }, 0);

  const savedCoords = JSON.parse(localStorage.getItem("coords") || "[]");
  const isSameLocation = (addrCoords) => {
    if (!addrCoords || addrCoords.length !== 2 || savedCoords.length !== 2)
      return false;
    const [lon1, lat1] = addrCoords;
    const [lon2, lat2] = savedCoords;
    const threshold = 0.0001; // ~10m
    return (
      Math.abs(lon1 - lon2) < threshold && Math.abs(lat1 - lat2) < threshold
    );
  };

  const {
    pageBg,
    panelBg,
    inputBg,
    cardBgActive,
    cardBgSelected,
    cardBgOrder,
    isDark,
    textPrimary,
    buttonHover,
    imgBg,
  } = useThemeClasses();

  const cardBg = (isSelected, isActive) => {
    if (isActive) return cardBgActive;
    if (isSelected) return cardBgSelected;
    return cardBgOrder;
  };

  return (
    <div className={`min-h-screen overflow-y-auto p-4 ${pageBg}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Book Order
        </h2>

        {/* Event Date */}
        <div className="mb-4">
          {error && (
            <p className="text-sm sm:text-base text-red-600 mt-2 px-2 sm:px-0">
              {error}
            </p>
          )}

          <label className="block mb-1 text-sm sm:text-base">Event Date:</label>
          <input
            type="date"
            className={`border p-2 w-full rounded text-sm sm:text-base ${inputBg}`}
            value={eventDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        {/* Address Selection */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Select Address
        </h3>

        <div className="flex space-x-3 overflow-x-auto mb-4 pb-2 scrollbar-hide">
          {loadingAddresses
            ? // 🟢 Shimmer placeholders
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg min-w-[220px] sm:min-w-[250px] flex-shrink-0 border animate-pulse ${
                    isDark
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-300 bg-gray-100"
                  }`}
                >
                  <div className="h-4 w-24 bg-gray-400/50 rounded mb-2"></div>
                  <div className="h-3 w-40 bg-gray-300/50 rounded mb-1"></div>
                  <div className="h-3 w-36 bg-gray-300/50 rounded mb-1"></div>
                  <div className="h-3 w-32 bg-gray-300/50 rounded mb-1"></div>
                  <div className="h-3 w-28 bg-gray-300/50 rounded"></div>
                </div>
              ))
            : // 🟢 Real address cards
              filteredAddresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`relative p-3 rounded-lg min-w-[220px] sm:min-w-[250px] flex-shrink-0 cursor-pointer border transition-all duration-200
                ${
                  selectedAddressId === addr._id
                    ? isDark
                      ? "border-blue-400 bg-blue-800"
                      : "border-blue-600 bg-blue-200"
                    : isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-300 bg-white"
                }`}
                  onClick={() => setSelectedAddressId(addr._id)}
                >
                  {isSameLocation(addr.location?.coordinates) && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      {/* Red dot */}
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                      {/* LIVE text */}
                      <span className="text-xs font-semibold text-red-500">
                        LIVE
                      </span>
                    </div>
                  )}

                  <p className="font-semibold text-sm sm:text-base">
                    {addr.label}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {addr.address_line1}, {addr.address_line2}
                  </p>
                  <p className="text-xs sm:text-sm">
                    {addr.city}, {addr.state} - {addr.postal_code}
                  </p>
                  <p className="text-xs sm:text-sm">{addr.country}</p>
                  <p className="text-xs sm:text-sm">
                    Phone: {addr.alternate_phone}
                  </p>
                </div>
              ))}
        </div>

        {/* Services */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Select Services
        </h3>
        <div className="flex space-x-3 overflow-x-auto mb-4 pb-2 scrollbar-hide">
          {cartServices.length === 0 && (
            <div className="text-sm sm:text-base">
              Your cart is empty, please add items.
            </div>
          )}
          {cartServices.map((service) => {
            const isSelected = selectedServices.find(
              (s) => s.vendorserviceid === service._id
            );
            const isActive = activeService?._id === service._id;
            return (
              <div
                key={service._id}
                className={`p-3 border rounded-lg min-w-[180px] sm:min-w-[200px] flex-shrink-0 cursor-pointer transition ${cardBg(
                  isSelected,
                  isActive
                )}`}
                onClick={() => toggleServiceSelection(service)}
              >
                <h4 className="font-semibold text-sm sm:text-base">
                  {service.service_name}
                </h4>
                <p className="text-xs sm:text-sm">
                  Vendor: {service.vendor.full_name}
                </p>
                <p className="text-xs sm:text-sm">
                  Price: ₹{service.final_price}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Service Form */}
        {activeService && (
          <div className={`p-3 rounded-lg mb-4 border ${panelBg}`}>
            <h4 className="font-semibold mb-2 text-sm sm:text-base">
              Fill details for: {activeService.service_name}
            </h4>
            <div className="mb-2">
              <label className="block mb-1 text-xs sm:text-sm">
                Scheduled From:
              </label>
              <input
                type="datetime-local"
                className={`border p-2 w-full rounded text-xs sm:text-sm ${inputBg}`}
                value={formData.scheduled_from}
                min={new Date().toISOString().slice(0, 16)} // restrict past times
                onChange={(e) =>
                  setFormData({ ...formData, scheduled_from: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1 text-xs sm:text-sm">
                Scheduled To:
              </label>
              <input
                type="datetime-local"
                className={`border p-2 w-full rounded text-xs sm:text-sm ${inputBg}`}
                value={formData.scheduled_to}
                min={
                  formData.scheduled_from ||
                  new Date().toISOString().slice(0, 16)
                } // restrict to >= from time
                onChange={(e) =>
                  setFormData({ ...formData, scheduled_to: e.target.value })
                }
              />
            </div>
    
            <div className="mb-3">
              <label className="block mb-1 text-xs sm:text-sm font-medium">
                Quantity:
              </label>

              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                <div
                  className={`flex items-center rounded-lg px-2 sm:px-3 py-1 ${imgBg}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        quantity: Math.max(1, (formData?.quantity || 1) - 1),
                      })
                    }
                    className={`p-1 sm:p-2 rounded-lg transition ${buttonHover}`}
                  >
                    <Minus size={16} className={textPrimary} />
                  </button>

                  <span
                    className={`px-2 sm:px-3 font-medium text-sm sm:text-base ${textPrimary}`}
                  >
                    {formData?.quantity || 1}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        quantity: (formData?.quantity || 1) + 1,
                      })
                    }
                    className={`p-1 sm:p-2 rounded-lg transition ${buttonHover}`}
                  >
                    <Plus size={16} className={textPrimary} />
                  </button>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              onClick={handleSaveForm}
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 mt-1 rounded-xl text-xs sm:text-sm transition-all shadow-sm border backdrop-blur-sm
    ${
      loading
        ? isDark
          ? "bg-gray-700/80 text-gray-200 border-gray-600/70 cursor-not-allowed opacity-90"
          : "bg-gray-200/80 text-gray-600 border-gray-300/70 cursor-not-allowed opacity-90"
        : isDark
        ? "bg-blue-900/70 hover:bg-blue-800/80 text-blue-200 border-blue-700/60"
        : "bg-blue-100/90 hover:bg-blue-200/95 text-blue-800 border-blue-300/60"
    }`}
            >
              <Save className="w-4 h-4" />
              Save Service
            </motion.button>
          </div>
        )}

        {/* Summary */}
        {selectedServices.length > 0 && (
          <div className={`mb-4 p-3 rounded-lg border ${panelBg}`}>
            <h4 className="font-semibold mb-2 text-sm sm:text-base">
              Selected Services Summary
            </h4>
            {selectedServices.map((s) => {
              const srv = cartServices.find((x) => x._id === s.vendorserviceid);
              return (
                <p key={s.vendorserviceid} className="text-xs sm:text-sm">{`${
                  srv?.service_name
                } × ${s.quantity} = ₹${
                  (srv?.final_price || 0) * s.quantity
                }`}</p>
              );
            })}
            <p className="mt-2 font-bold text-sm sm:text-base">
              Total: ₹{totalAmount}
            </p>
          </div>
        )}

        {cartServices.length > 0 && (
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base transition-all shadow-sm border backdrop-blur-sm
      ${
        loading
          ? "bg-gray-200/60 text-gray-500 border-gray-300/50 cursor-not-allowed opacity-80"
          : "bg-green-100/70 hover:bg-green-200/80 text-green-800 border-green-300/40"
      }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Submit Order
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default BookOrder;
