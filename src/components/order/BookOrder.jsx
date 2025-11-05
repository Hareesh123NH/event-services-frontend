import React, { useState, useEffect } from "react";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";

const BookOrder = () => {

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(localStorage.getItem("addressId"));
  const [eventDate, setEventDate] = useState("");
  const [cartServices, setCartServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [formData, setFormData] = useState({
    scheduled_from: "",
    scheduled_to: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/user/address");
      setAddresses(res.data.addresses);
      if (!selectedAddressId && simplified.length > 0) {
        localStorage.setItem("addressId", simplified[0]._id);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
    setCartServices(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const isFormComplete = () =>
    formData.scheduled_from && formData.scheduled_to && formData.quantity;

  const toggleServiceSelection = (service) => {
    if (activeService && activeService._id !== service._id) {
      if (!isFormComplete()) {
        setSelectedServices((prev) =>
          prev.filter((s) => s.vendorserviceid !== activeService._id)
        );
      }
      setFormData({ scheduled_from: "", scheduled_to: "", quantity: service.quantity });
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
      setFormData({ scheduled_from: "", scheduled_to: "", quantity: service.quantity });
    } else {
      setActiveService(service);
    }
  };



  const handleSaveForm = () => {
    if (!isFormComplete()) {
      alert("Please fill all fields before saving this service.");
      return;
    }

    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.vendorserviceid === activeService._id);
      if (exists) {
        return prev.map((s) =>
          s.vendorserviceid === activeService._id
            ? { ...s, ...formData }
            : s
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

    console.log("book add id",selectedAddressId);
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



  const {
    pageBg,
    panelBg,
    inputBg,
    cardBgActive,
    cardBgSelected,
    cardBgOrder,
    isDark,
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
            onChange={(e) => setEventDate(e.target.value)}
            required />
        </div>

        {/* Address Selection */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Select Address
        </h3>
        <div className="flex space-x-3 overflow-x-auto mb-4 pb-2 scrollbar-hide">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-3 rounded-lg min-w-[220px] sm:min-w-[250px] flex-shrink-0 cursor-pointer border transition-all duration-200 ${selectedAddressId === addr._id
                ? isDark
                  ? "border-blue-400 bg-blue-800"
                  : "border-blue-600 bg-blue-200"
                : isDark
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-300 bg-white"
                }`}
              onClick={() => {
                console.log("lasr seleced addId",addr._id);
                setSelectedAddressId(addr._id)
              }}
            >
              <p className="font-semibold text-sm sm:text-base">{addr.label}</p>
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
                onChange={(e) =>
                  setFormData({ ...formData, scheduled_to: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-xs sm:text-sm">Quantity:</label>
              <input
                type="number"
                min="1"
                className={`border p-2 w-full rounded text-xs sm:text-sm ${inputBg}`}
                value={activeService.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
            </div>

            <button
              className={`w-full sm:w-auto px-4 py-2 mt-1 rounded text-xs sm:text-sm text-white ${isDark
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
              onClick={handleSaveForm}
            >
              Save Service
            </button>
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
                <p
                  key={s.vendorserviceid}
                  className="text-xs sm:text-sm"
                >{`${srv?.service_name} × ${s.quantity} = ₹${(srv?.final_price || 0) * s.quantity
                  }`}</p>
              );
            })}
            <p className="mt-2 font-bold text-sm sm:text-base">
              Total: ₹{totalAmount}
            </p>
          </div>
        )}

        <button
          className={`w-full sm:w-auto px-4 py-2 rounded text-sm sm:text-base transition ${cartServices.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:opacity-90 text-white"
            }`}
          onClick={handleSubmit}
          disabled={cartServices.length === 0 || loading}
        >
          {loading ? "Submitting" : "Submit Order"}
        </button>
      </div>
    </div>
  );
};

export default BookOrder;
