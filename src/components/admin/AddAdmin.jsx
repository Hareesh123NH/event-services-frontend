import React, { useState } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import api from "../axiosConfig";

const AddNewAdmin = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(formData.full_name)) {
      alert(
        "Please enter a valid full name (letters and spaces only, at least 3 characters)."
      );
      return;
    }

    // Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone_number)) {
      alert(
        "Please enter a valid 10-digit Indian phone number starting with 6-9."
      );
      return;
    }

    setLoading(true);
    try {
      await api.post("/admin/create", formData);
      alert("Admin added successfully!");

      setFormData({ full_name: "", email: "", phone_number: "", password: "" });
    } catch (error) {
      console.error("Error adding admin:", error);
      alert(error.response?.data?.message || "Failed to add admin!");
    }
    setLoading(false);
  };

  const { pageBg, cardBg, textClass, labelClass, inputBg, buttonBg } =
    useThemeClasses();

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
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}
            >
              Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg}`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}
            >
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

          {/* Password */}
          <div className="relative">
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}
            >
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${inputBg}`}
              required
            />

            {/* 👁 Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[65%] -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Phone */}
          <div>
            <label
              className={`block mb-1 text-sm sm:text-base font-medium ${labelClass}`}
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
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
            disabled={loading}
            type="submit"
            className={`w-full py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all bg-blue-200 hover:bg-blue-300 text-blue-800`}
          >
            {loading ? "Adding" : "Add Admin"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewAdmin;
