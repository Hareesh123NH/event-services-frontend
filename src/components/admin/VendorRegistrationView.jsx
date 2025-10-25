import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, FileText, Briefcase } from "lucide-react";
import { token, vendorRegistrations } from "../data/duplicatedata";
import { useThemeClasses } from "../theme/themeClasses";


const VendorRegistrationView = () => {
 
  const vendors = vendorRegistrations;

  if (!vendors || vendors.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No vendor registrations found.
      </div>
    );
  }

  // Fetch and open/download media securely
  const handleFileClick = async (fileId, fileName) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/media/${fileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const newTab = window.open(url, "_blank");
      if (!newTab) {
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

  // Theme-based classes
  const { pageBg,textPrimary,textSecondary,cardBg,fileText,cardBorder } = useThemeClasses();
  
  return (
    <motion.div
      layout
      className={`p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto ${pageBg}`}
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
          className={`${cardBg} shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-5 border ${cardBorder}`}
        >
          {/* Vendor Info */}
          <h2 className={`text-xl font-semibold mb-2 ${textPrimary}`}>
            {vendor.vendor_name}
          </h2>

          <div className={`flex items-center ${textSecondary} text-sm`}>
            <Mail className="w-4 h-4 mr-2" />
            {vendor.email}
          </div>
          <div className={`flex items-center ${textSecondary} text-sm`}>
            <Phone className="w-4 h-4 mr-2" />
            {vendor.phonenumber}
          </div>

          <p className={`text-sm mt-2 ${textSecondary}`}>{vendor.desc}</p>

          <div className={`flex items-center ${textSecondary} text-sm mt-2`}>
            <MapPin className="w-4 h-4 mr-2" />
            {vendor.address}
          </div>

          {/* Service Info */}
          {vendor.service && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} mt-3 p-3 rounded-xl`}
            >
              <div className="flex items-center mb-1">
                <Briefcase className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
                <span className={`${textPrimary} font-medium`}>
                  {vendor.service.service_name}
                </span>
              </div>
              <div className={`${textSecondary} text-sm`}>
                ₹{vendor.service.base_price}{" "}
                <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  ({vendor.service.pricing_type})
                </span>
              </div>
            </motion.div>
          )}

          {/* Media Files */}
          {vendor.media && vendor.media.length > 0 && (
            <div className="mt-4">
              <h4 className={`font-semibold mb-2 ${textPrimary}`}>Uploaded Files:</h4>
              <ul className="space-y-1">
                {vendor.media.map((file) => (
                  <motion.li
                    key={file.id}
                    whileHover={{ x: 5 }}
                    className={`flex items-center text-sm cursor-pointer ${fileText}`}
                    onClick={() => handleFileClick(file.id, file.name)}
                  >
                    <FileText className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
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
