import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, FileText, Briefcase, Check, X, Loader2 } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";

const VendorRegistrationView = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const fetchVendorRegistrations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/vendor-registrations");
      setVendors(res.data);
    } catch (err) {
      console.error("Error fetching vendor registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorRegistrations();
  }, []);

  // Handle media file click
  const handleFileClick = async (fileId, fileName) => {
    setLoadingId(fileId);
    try {
      const response = await api.get(`/admin/media/${fileId}`, {
        responseType: "blob",
      });

      if (!response || !response.data) throw new Error("Failed to fetch file");

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      // 🟢 Open all files (images, PDFs, etc.) in a new tab
      const newTab = window.open(url, "_blank");

      // If popup blocked, fallback to manual download
      if (!newTab) {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch file. Check console for details.");
    }
    setLoadingId(null);
  };


  const onAccept = async (id) => {

    if(!confirm("Are sure to Accept?")){
      return ;
    }
    console.log("Accepted vendor:", id);

    try {

      setLoadingId(id + 1)

      await api.post(`/admin/accept/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      fetchVendorRegistrations();

    } catch (err) {
      console.error("Error accepting vendor:", err);
    } finally {
      setLoadingId(null);
    }

  };

  const onReject = async (id) => {

    if(!confirm("Are sure to Reject?")){
      return ;
    }

    console.log("Rejected vendor:", id);
    try {

      setLoadingId(id + 2);

      await api.delete(`/admin/reject/${id}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      fetchVendorRegistrations();

    } catch (err) {
      console.error("Error rejecting vendor:", err);
    } finally {
      setLoadingId(null);
    }
  };

  // Theme classes
  const {
    pageBg,
    textPrimary,
    textSecondary,
    cardBg,
    fileText,
    cardBorder,
    textClass,
    modalBg,
  } = useThemeClasses();


  if (loading) {

    return (
      <div
        className={`p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${pageBg}`}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`${cardBg} border ${cardBorder} rounded-2xl p-5 overflow-hidden relative`}
          >
            <div className="relative space-y-3">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }


  if (!vendors || vendors.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        No vendor registrations found.
      </div>
    );
  }

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
              className={`${modalBg} mt-3 p-3 rounded-xl`}
            >
              <div className="flex items-center mb-1">
                <Briefcase className={`w-4 h-4 mr-2 ${textClass}`} />
                <span className={`${textPrimary} font-medium`}>
                  {vendor.service.service_name}
                </span>
              </div>
              <div className={`${textSecondary} text-sm`}>
                ₹{vendor.service.base_price}{" "}
                <span className={`text-xs ${textSecondary}`}>
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
                    className={`flex items-center text-sm cursor-pointer truncate max-w-full ${fileText}`}
                    onClick={() => handleFileClick(file.id, file.name)}
                    title={file.name} // tooltip for long names
                  >
                    {loadingId === file.id ? (
                      <Loader2 className="w-4 h-4 mr-2 text-blue-500 animate-spin flex-shrink-0" />
                    ) : (
                      <FileText className={`w-4 h-4 mr-2 ${textSecondary} flex-shrink-0`} />
                    )}
                    <span className="truncate">{file.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAccept(vendor._id)}
              disabled={loadingId === vendor._id + 2}
              className="flex items-center justify-center px-4 py-2 bg-green-200 hover:bg-green-300 text-green-800 rounded-xl shadow-sm transition-all"
            >
              {loadingId === vendor._id + 1 ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onReject(vendor._id)}
              disabled={loadingId === vendor._id + 1}
              className="flex items-center justify-center px-4 py-2 bg-red-200 hover:bg-red-300 text-red-800 rounded-xl shadow-sm transition-all"
            >
              {loadingId === vendor._id + 2 ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <>
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default VendorRegistrationView;
