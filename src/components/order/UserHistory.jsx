import React from "react";
import { motion } from "framer-motion";
import { orderData } from "../data/duplicatedata";

const UserHistory = () => {
    const orders = orderData.orders
    if (!orders || orders.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                No orders found.
            </div>
        );
    }

    return (
        <motion.div layout className="p-4 space-y-6 overflow-y-auto">
            {orders.map((order) => (
                <motion.div
                    key={order._id}
                    layout
                    whileHover={{ scale: 1.01 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between"
                >
                    {/* LEFT: Order Info */}
                    <div className="p-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">
                            Order ID: {order._id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Event Date: {new Date(order.event_date).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Order Date: {new Date(order.order_date).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Address: {order.event_address.address_line1},{" "}
                            {order.event_address.city}
                        </p>

                        <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Total Amount: ₹{order.total_amount}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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

                        {/* Action Buttons */}
                        {/* <div className="mt-4 flex gap-2">

                            {order.status === "pending" && (
                                <button
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                    onClick={() => alert(`Cancelling order ${order._id}`)}
                                >
                                    Cancel
                                </button>
                            )}

                        </div> */}
                    </div>

                    {/* RIGHT: Services (Horizontal Grid) */}
                    {order.services && order.services.length > 0 && (
                        <div className="p-4 flex-1 overflow-x-auto">
                            <div className="flex space-x-4 min-w-max">
                                {order.services.map((service, index) => (
                                    <div
                                        key={service._id}
                                        className="min-w-[220px] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm flex-shrink-0"
                                    >
                                        <p className="font-medium text-gray-700 dark:text-gray-200 text-sm mb-1">
                                            Service {index + 1}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Vendor: {service.vendor_service.vendor.email}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Price: ₹{service.price}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Provider: {service.provider_status}
                                        </p>
                                        {service.scheduled_from && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
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
