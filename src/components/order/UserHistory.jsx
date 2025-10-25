import React, { useContext } from "react";
import { motion } from "framer-motion";
import { orderData } from "../data/duplicatedata";
import { useThemeClasses } from "../theme/themeClasses";

const UserHistory = () => {
    const { pageBg, cardBg, textClass, labelClass, inputBg, buttonBg,borderColor,secondaryText} = useThemeClasses();


    const orders = orderData.orders;
    if (!orders || orders.length === 0) {
        return (
            <div className={`${secondaryText} text-center mt-10`}>
                No orders found.
            </div>
        );
    }

    return (
        <motion.div layout className={`p-4 space-y-6 overflow-y-auto ${pageBg}`}>
            {orders.map((order) => (
                <motion.div
                    key={order._id}
                    layout
                    whileHover={{ scale: 1.01 }}
                    className={`${cardBg} rounded-xl shadow hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between`}
                >
                    {/* LEFT: Order Info */}
                    <div className={`p-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r ${borderColor}`}>
                        <h3 className={`font-semibold text-lg ${textClass} mb-1`}>
                            Order ID: {order._id.slice(-6)}
                        </h3>
                        <p className={`text-sm ${secondaryText}`}>
                            Event Date: {new Date(order.event_date).toLocaleDateString("en-IN")}
                        </p>
                        <p className={`text-sm ${secondaryText}`}>
                            Order Date: {new Date(order.order_date).toLocaleDateString("en-IN")}
                        </p>
                        <p className={`text-sm ${secondaryText}`}>
                            Address: {order.event_address.address_line1}, {order.event_address.city}
                        </p>

                        <div className={`mt-3 border-t pt-2 ${borderColor}`}>
                            <p className={`text-sm font-medium ${textClass}`}>
                                Total Amount: ₹{order.total_amount}
                            </p>
                            <p className={`text-sm ${secondaryText}`}>
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
                            <p className={`text-sm ${secondaryText}`}>
                                Payment:{" "}
                                <span className={order.payment_status === "pending" ? "text-yellow-500" : "text-green-500"}>
                                    {order.payment_status}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Services (Horizontal Grid) */}
                    {order.services && order.services.length > 0 && (
                        <div className="p-4 flex-1 overflow-x-auto">
                            <div className="flex space-x-4 min-w-max">
                                {order.services.map((service, index) => (
                                    <div
                                        key={service._id}
                                        className={`min-w-[220px] ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"} border rounded-lg p-3 shadow-sm flex-shrink-0`}
                                    >
                                        <p className={`font-medium text-sm mb-1 ${textClass}`}>
                                            Service {index + 1}
                                        </p>
                                        <p className={`text-sm ${secondaryText}`}>
                                            Vendor: {service.vendor_service.vendor.email}
                                        </p>
                                        <p className={`text-sm ${secondaryText}`}>
                                            Price: ₹{service.price}
                                        </p>
                                        <p className={`text-sm ${secondaryText}`}>
                                            Provider: {service.provider_status}
                                        </p>
                                        {service.scheduled_from && (
                                            <p className={`text-xs ${secondaryText}`}>
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
    );
};

export default UserHistory;
