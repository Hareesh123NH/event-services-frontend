import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";

export const ServiceModal = ({ service, onClose, onSave }) => {
  

  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    base_price: "",
    pricing_type: "per_day",
  });

  // Update formData when service changes
  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        service_name: "",
        description: "",
        base_price: "",
        pricing_type: "per_day",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Theme-based classes
  const { modalBg, inputBg, textPrimary,textSecondary,cancelBtnBg,saveBtnBg } = useThemeClasses();
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className={`${modalBg} rounded-xl p-6 w-full max-w-md shadow-lg`}
      >
        <h2 className={`text-xl font-semibold mb-5 ${textPrimary}`}>
          {service ? "Edit Service" : "Add Service"}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>
              Service Name
            </label>
            <input
              type="text"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`border rounded px-3 py-2 w-full h-20 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${inputBg}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>
              Base Price
            </label>
            <input
              type="number"
              name="base_price"
              value={formData.base_price}
              onChange={handleChange}
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${textSecondary}`}>
              Pricing Type
            </label>
            <select
              name="pricing_type"
              value={formData.pricing_type}
              onChange={handleChange}
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
            >
              <option value="per_day">Per Day</option>
              <option value="per_hour">Per Hour</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className={`px-4 py-2 rounded ${cancelBtnBg}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded ${saveBtnBg}`}
            onClick={() => onSave(formData)}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};
