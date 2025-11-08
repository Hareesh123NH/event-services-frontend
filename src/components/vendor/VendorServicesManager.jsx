import { motion } from "framer-motion";
import VendorServiceBlock from "./VendorServiceBlock";
import VendorServiceSkeleton from "./VendorServiceSkeleton";
import { useThemeClasses } from "../theme/themeClasses";
import { useEffect, useState } from "react";
import api from "../axiosConfig";

const VendorServicesManager = () => {
  const [services, setServices] = useState(
    JSON.parse(sessionStorage.getItem("vendor-services")) || null
  );
  const [loading, setLoading] = useState(false);

  const fetchVendorServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/service/vendor");
      sessionStorage.setItem("vendor-services", JSON.stringify(res.data.services));
      setServices(res.data.services);
    } catch (err) {
      console.error("Error fetching vendor services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!services) {
      fetchVendorServices();
    }
  }, []);



  const { containerBg } = useThemeClasses();

  return (
    <motion.div
      layout
      className={`p-4 sm:p-4 overflow-y-auto h-[calc(100vh-4rem)] transition-colors duration-300 ${containerBg}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <VendorServiceSkeleton key={index} index={index} />
            ))
          : services?.map((item, index) => (
              <VendorServiceBlock
                key={item.service._id}
                serviceItem={item}
                index={index}
                onUpdate={fetchVendorServices} 
              />
            ))}
      </div>
    </motion.div>
  );
};

export default VendorServicesManager;
