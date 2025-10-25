import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses"


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

  // Dynamic classes based on theme
  const { pageBg, cardBg, textClass, labelClass, inputBg, buttonBg} = useThemeClasses();

  return (
    <div className={`flex justify-center items-start py-10 w-full min-h-screen ${pageBg}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-lg ${cardBg} rounded-xl shadow-lg p-8`}
      >
        <h2 className={`text-2xl font-bold mb-6 text-center ${textClass}`}>
          Add New Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className={`block mb-1 font-medium ${labelClass}`}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className={`block mb-1 font-medium ${labelClass}`}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className={`block mb-1 font-medium ${labelClass}`}>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border ${inputBg}`}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg transition-all ${buttonBg}`}
          >
            Add Admin
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewAdmin;
