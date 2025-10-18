import React from "react";
import { motion } from "framer-motion";

const VendorPendingOrders = ({ orders, onAction }) => {
    if (!orders || orders.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
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
                    className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row justify-between"
                >
                    {/* LEFT: Order Info */}
                    <div className="p-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-1">
                            Order ID: {order.order_id.slice(-6)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Customer: {order.user.full_name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Event Date:{" "}
                            {new Date(order.event_date).toLocaleDateString("en-IN")}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Location: {order.event_address.city}, {order.event_address.state}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Phone Numer: +91 {order.user.phone_number}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Email: {order.user.email}
                        </p>

                    </div>

                    {/* RIGHT: Services */}
                    {order.services && order.services.length > 0 && (
                        <div className="p-4 flex-1 overflow-x-auto">
                            <div className="flex space-x-4 min-w-max">
                                {order.services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="min-w-[220px] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm flex-shrink-0 flex flex-col justify-between"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-700 dark:text-gray-200 text-sm mb-1">
                                                {service.service_name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Quantity: {service.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Price: ₹{service.price}
                                            </p>

                                            {service.scheduled_from && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Date:{" "}
                                                    {new Date(
                                                        service.scheduled_from
                                                    ).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                    <br />
                                                    Time:{" "}
                                                    {new Date(
                                                        service.scheduled_from
                                                    ).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        service.scheduled_to
                                                    ).toLocaleTimeString([], {
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
                                                        onAction?.(
                                                            order.order_id,
                                                            service.service_id,
                                                            "accepted"
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
                                                    onClick={() =>
                                                        onAction?.(
                                                            order.order_id,
                                                            service.service_id,
                                                            "rejected"
                                                        )
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
