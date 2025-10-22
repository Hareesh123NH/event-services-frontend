import { motion } from "framer-motion";
import VendorServiceBlock from "./VendorServiceBlock";
import { vendorServices } from "../data/duplicatedata";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const VendorServicesManager = ({ onAddNew }) => {
    const services = vendorServices.services;
    const { theme } = useContext(ThemeContext);

    return (
        <motion.div
            layout
            className={`p-6 flex flex-col gap-8 overflow-y-auto ${
                theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {services.map((item, index) => (
                <VendorServiceBlock
                    key={item.service._id}
                    serviceItem={item}
                    index={index}
                />
            ))}

            {/* Optional: Add New Service Button */}
            {onAddNew && (
                <button
                    onClick={onAddNew}
                    className={`mt-4 px-4 py-2 rounded-lg text-white ${
                        theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    Add New Service
                </button>
            )}
        </motion.div>
    );
};

export default VendorServicesManager;
