import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import OrdersShimmer from "./OrdersShimmer";
import { useOutletContext } from "react-router-dom";

const UserHistory = () => {


  const [orders, setOrders] = useState(JSON.parse(sessionStorage.getItem("user-history")) || null);
  const [loading, setLoading] = useState(false);

  const { search } = useOutletContext();

  useEffect(() => {

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get("/order/user");
        sessionStorage.setItem("user-history", JSON.stringify(res.data.orders))
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }

      setLoading(false);
    };


    if (!orders) {
      fetchOrders();
    }

    window.addEventListener("load", fetchOrders);

    return () => {
      window.removeEventListener("load", fetchOrders);
    };

  }, [])



  const includesSearch = (value, term) => {
    if (!value) return false;
    return value.toString().toLowerCase().includes(term);
  };

  // 🔎 Filter logic across *all* attributes
  const filteredOrders = orders.filter(order => {
    if (!search) return true;
    const term = search.toLowerCase();

    const address = order.event_address || {};
    const services = order.services || [];

    // Collect vendor-related info
    const vendorFields = services
      .map(s => s.vendor_service?.vendor)
      .filter(Boolean)
      .flatMap(v => [v.name, v.email, v.phone_number]);

    // Collect service-related info
    const serviceFields = services.flatMap(s => [
      s.price,
      s.quantity,
      s.provider_status,
      s.scheduled_from,
      s.scheduled_to,
      s.vendor_service?.status,
      s.vendor_service?.final_price,
    ]);

    // Check across all relevant order attributes
    return [
      order._id,
      order.status,
      order.payment_status,
      order.total_amount,
      order.actual_amount,
      order.event_date,
      order.order_date,
      address.label,
      address.address_line1,
      address.address_line2,
      address.city,
      ...vendorFields,
      ...serviceFields,
    ]
      .filter(Boolean)
      .some(field => includesSearch(field, term));
  });

  const {
    pageBg,
    cardBg,
    textClass,
    secondaryText,
    borderColor,
    isDark,
  } = useThemeClasses();



  return (

    <>
      {loading || !orders ? <OrdersShimmer isDark={isDark} /> : (
        orders.length === 0 ? (
          <div className={`${secondaryText} text-center mt-10 text-sm sm:text-base`}>
            No orders found.
          </div>
        ) : (
          <motion.div layout className={`p-3 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto ${pageBg}`}>
            {filteredOrders.map((order) => (
              <motion.div
                key={order._id}
                layout
                whileHover={{ scale: 1.01 }}
                className={`${cardBg} rounded-lg sm:rounded-xl shadow hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between border ${borderColor}`}
              >
                {/* LEFT: Order Info */}
                <div className={`p-3 sm:p-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r ${borderColor}`}>
                  <h3 className={`font-semibold text-base sm:text-lg ${textClass} mb-1`}>
                    Order ID: {order._id.slice(-6)}
                  </h3>

                  <p className={`text-xs sm:text-sm ${secondaryText}`}>
                    Event Date: {new Date(order.event_date).toLocaleDateString("en-IN")}
                  </p>
                  <p className={`text-xs sm:text-sm ${secondaryText}`}>
                    Order Date: {new Date(order.order_date).toLocaleDateString("en-IN")}
                  </p>
                  <p className={`text-xs sm:text-sm ${secondaryText}`}>
                    Address: {order.event_address.address_line1}, {order.event_address.city}
                  </p>

                  <div className={`mt-3 border-t pt-2 ${borderColor}`}>
                    <p className={`text-xs sm:text-sm font-medium ${textClass}`}>
                      Actual Amount: ₹{order.actual_amount}
                    </p>
                    <p className={`text-xs sm:text-sm font-medium ${textClass}`}>
                      Total Amount: ₹{order.total_amount}
                    </p>
                    <p className={`text-xs sm:text-sm ${secondaryText}`}>
                      Status:{" "}
                      <span
                        className={`font-medium ${order.status === "confirmed"
                          ? "text-green-500"
                          : order.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                          }`}
                      >
                        {order.status}
                      </span>
                    </p>
                    <p className={`text-xs sm:text-sm ${secondaryText}`}>
                      Payment:{" "}
                      <span
                        className={
                          order.payment_status === "pending"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }
                      >
                        {order.payment_status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* RIGHT: Services */}
                {order.services && order.services.length > 0 && (
                  <div className="p-3 sm:p-4 flex-1 overflow-x-auto">
                    <div className="flex space-x-3 sm:space-x-4 min-w-max pb-2">
                      {order.services.map((service, index) => (
                        <div
                          key={service._id}
                          className={`min-w-[180px] sm:min-w-[220px] ${isDark
                            ? "bg-gray-900 border-gray-700"
                            : "bg-gray-50 border-gray-200"
                            } border rounded-lg p-2 sm:p-3 shadow-sm flex-shrink-0`}
                        >
                          <p className={`font-medium text-xs sm:text-sm mb-1 ${textClass}`}>
                            Service {index + 1}
                          </p>
                          <p className={`text-xs sm:text-sm ${secondaryText}`}>
                            Vendor: {service.vendor_service.vendor.email}
                          </p>
                          <p className={`text-xs sm:text-sm ${secondaryText}`}>
                            Price: ₹{service.price} × Qty({service.quantity}) = ₹{service.price * service.quantity}
                          </p>
                          <p className={`text-xs sm:text-sm ${secondaryText}`}>
                            Provider: {service.provider_status}
                          </p>
                          {service.scheduled_from && (
                            <p className={`text-[10px] sm:text-xs ${secondaryText}`}>
                              Date:{" "}
                              {new Date(service.scheduled_from).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              <br />
                              Time:{" "}
                              {new Date(service.scheduled_from).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}{" "}
                              -{" "}
                              {new Date(service.scheduled_to).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )
      )}
    </>
  );
};






export default UserHistory;
