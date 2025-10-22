import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, FileText, Briefcase } from "lucide-react";
import { token, vendorRegistrations } from "../data/duplicatedata";

const VendorRegistrationView = () => {

  const vendors = vendorRegistrations;
  if (!vendors || vendors.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No vendor registrations found.
      </div>
    );
  }

  // Function to fetch and open/download media securely
  const handleFileClick = async (fileId, fileName) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/media/${fileId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // your auth token
        },
      });

      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Open file in a new tab
      const newTab = window.open(url, "_blank");
      if (!newTab) {
        // If pop-ups are blocked, force download
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch file. Check console for details.");
    }
  };

  return (
    <motion.div
      layout
      className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {vendors.map((vendor, index) => (
        <motion.div
          key={vendor._id}
          layout
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-800 dark:text-gray-200 
                     shadow-md hover:shadow-xl transition-all duration-300 
                     rounded-2xl p-5 border border-gray-100 dark:border-gray-700"
        >
          {/* Vendor Info */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {vendor.vendor_name}
          </h2>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Mail className="w-4 h-4 mr-2" />
            {vendor.email}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Phone className="w-4 h-4 mr-2" />
            {vendor.phonenumber}
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
            {vendor.desc}
          </p>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-2">
            <MapPin className="w-4 h-4 mr-2" />
            {vendor.address}
          </div>

          {/* Service Info */}
          {vendor.service && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl"
            >
              <div className="flex items-center mb-1">
                <Briefcase className="w-4 h-4 mr-2 text-gray-700 dark:text-gray-300" />
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {vendor.service.service_name}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">
                ₹{vendor.service.base_price}{" "}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({vendor.service.pricing_type})
                </span>
              </div>
            </motion.div>
          )}

          {/* Media Files */}
          {vendor.media && vendor.media.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Uploaded Files:
              </h4>
              <ul className="space-y-1">
                {vendor.media.map((file) => (
                  <motion.li
                    key={file.id}
                    whileHover={{ x: 5 }}
                    className="flex items-center text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
                    onClick={() => handleFileClick(file.id, file.name)}
                  >
                    <FileText className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                    {file.name}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VendorRegistrationView;
