import { motion } from "framer-motion";
import VendorServiceBlock from "./VendorServiceBlock";
import { vendorServices } from "../data/duplicatedata";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const VendorServicesManager = () => {
  const { theme } = useContext(ThemeContext);
  const services = vendorServices.services;

  const containerBg =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";

  return (
    <motion.div
      layout
      className={`p-6 flex flex-col gap-8 overflow-y-auto h-[calc(100vh-4rem)] transition-colors duration-300 ${containerBg}`}
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
    </motion.div>
  );
};

export default VendorServicesManager;
