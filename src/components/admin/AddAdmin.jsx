import React, { useState } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";

const AddNewAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Admin Data:", formData);
    alert("Admin added successfully!");
    setFormData({ name: "", email: "", phone: "" });
  };

  const { pageBg, cardBg, textClass, labelClass, inputBg, buttonBg } = useThemeClasses();

  return (
    <div
      className={`flex justify-center items-start sm:items-center py-8 sm:py-12 px-4 sm:px-8 w-full min-h-screen ${pageBg}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md sm:max-w-lg ${cardBg} rounded-xl shadow-lg p-6 sm:p-8`}
      >
        <h2
          className={`text-xl sm:text-2xl font-bold mb-6 text-center ${textClass}`}
        >
          Add New Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}>
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all ${buttonBg}`}
          >
            Add Admin
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewAdmin;
