import React from "react";
import { motion } from "framer-motion";
import { pendingOrders } from "../data/duplicatedata";
import { useThemeClasses } from "../theme/themeClasses";

const VendorPendingOrders = ({ onAction }) => {

  const orders = pendingOrders.orders;

  const { bgCard, bgService, textPrimary, textSecondary, borderColor } = useThemeClasses();

  if (!orders || orders.length === 0) {
    return (
      <div className={`${textSecondary} text-center mt-10`}>
        No pending orders found.
      </div>
    );
  }

  return (
    <motion.div layout className="p-4 space-y-6 overflow-y-auto">
      {orders.map((order) => (
        <motion.div
          key={order.order_id}
          layout
          whileHover={{ scale: 1.01 }}
          className={`${bgCard} rounded-xl shadow hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between`}
        >
          {/* LEFT: Order Info */}
          <div
            className={`p-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r ${borderColor}`}
          >
            <h3 className={`font-semibold text-lg ${textPrimary} mb-1`}>
              Order ID: {order.order_id.slice(-6)}
            </h3>
            <p className={`text-sm ${textSecondary}`}>
              Customer: {order.user.full_name}
            </p>
            <p className={`text-sm ${textSecondary}`}>
              Event Date:{" "}
              {new Date(order.event_date).toLocaleDateString("en-IN")}
            </p>
            <p className={`text-sm ${textSecondary}`}>
              Location: {order.event_address.city}, {order.event_address.state}
            </p>
            <p className={`text-sm ${textSecondary}`}>
              Phone Number: +91 {order.user.phone_number}
            </p>
            <p className={`text-sm ${textSecondary}`}>Email: {order.user.email}</p>
          </div>

          {/* RIGHT: Services */}
          {order.services && order.services.length > 0 && (
            <div className="p-4 flex-1 overflow-x-auto">
              <div className="flex space-x-4 min-w-max">
                {order.services.map((service, index) => (
                  <div
                    key={index}
                    className={`${bgService} border ${borderColor} rounded-lg p-3 shadow-sm flex-shrink-0 flex flex-col justify-between`}
                  >
                    <div>
                      <p className={`font-medium text-sm mb-1 ${textPrimary}`}>
                        {service.service_name}
                      </p>
                      <p className={`text-sm ${textSecondary}`}>
                        Quantity: {service.quantity}
                      </p>
                      <p className={`text-sm ${textSecondary}`}>
                        Price: ₹{service.price}
                      </p>

                      {service.scheduled_from && (
                        <p className={`text-xs mt-1 ${textSecondary}`}>
                          Date:{" "}
                          {new Date(service.scheduled_from).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
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

                    {/* ACTION BUTTONS */}
                    {service.provider_status === "pending" && (
                      <div className="mt-3 flex gap-2">
                        <button
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition text-sm"
                          onClick={() =>
                            onAction?.(order.order_id, service.service_id, "accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
                          onClick={() =>
                            onAction?.(order.order_id, service.service_id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VendorPendingOrders;
