import { motion } from "framer-motion";

const OrdersShimmer = ({ count = 3, isDark }) => {
    return (
        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    layout
                    className={`rounded-lg sm:rounded-xl shadow animate-pulse flex flex-col md:flex-row justify-between border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
                        }`}
                >
                    {/* LEFT: Order Info Skeleton */}
                    <div className={`p-3 sm:p-4 w-full md:w-1/3 border-b md:border-b-0 md:border-r ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                        <div className="h-4 sm:h-5 bg-gray-400 rounded mb-2 w-3/4"></div>
                        <div className="h-3 sm:h-4 bg-gray-400 rounded mb-1 w-5/6"></div>
                        <div className="h-3 sm:h-4 bg-gray-400 rounded mb-1 w-4/6"></div>
                        <div className="h-3 sm:h-4 bg-gray-400 rounded mb-1 w-5/6"></div>
                        <div className="mt-3 border-t pt-2">
                            <div className="h-3 sm:h-4 bg-gray-400 rounded mb-1 w-1/2"></div>
                            <div className="h-3 sm:h-4 bg-gray-400 rounded mb-1 w-2/3"></div>
                            <div className="h-3 sm:h-4 bg-gray-400 rounded w-1/3"></div>
                        </div>
                    </div>

                    {/* RIGHT: Services Skeleton */}
                    <div className="p-3 sm:p-4 flex-1 overflow-x-auto">
                        <div className="flex space-x-3 sm:space-x-4 min-w-max pb-2">
                            {Array.from({ length: 2 }).map((_, svcIndex) => (
                                <div
                                    key={svcIndex}
                                    className={`min-w-[180px] sm:min-w-[220px] ${isDark ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"
                                        } border rounded-lg p-2 sm:p-3 shadow-sm flex-shrink-0`}
                                >
                                    <div className="h-3 sm:h-4 bg-gray-400 rounded mb-2 w-3/4"></div>
                                    <div className="h-2 sm:h-3 bg-gray-400 rounded mb-1 w-5/6"></div>
                                    <div className="h-2 sm:h-3 bg-gray-400 rounded mb-1 w-2/3"></div>
                                    <div className="h-2 sm:h-3 bg-gray-400 rounded w-4/6"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default OrdersShimmer;