import React, { useState } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent full page reload
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      const { token, user } = res.data;

      // ✅ Save token and user info
      localStorage.setItem("token", token);
      login(user);

      // ✅ Navigate after successful login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    pageBg,
    formBg,
    inputBg,
    labelColor,
    linkText,
    btnBg,
  } = useThemeClasses();

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row items-center justify-center ${pageBg} transition-all`}
    >
      {/* Left Side Image */}
      <div className="hidden md:flex md:w-1/2">
        <LeftSideImage
          url="https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png"
        />
      </div>

      {/* Right Side - Login Form */}
      <div
        className={`w-full md:w-1/2 flex justify-center items-center px-6 sm:px-8 py-10 md:py-16 ${formBg}`}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
            Welcome Back
          </h2>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputBg}`}
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputBg}`}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Role Dropdown */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputBg}`}
                required
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Forgot & Register Links */}
            <div className="flex justify-between items-center text-sm">
              <a href="#" className={`${linkText}`}>Forgot Password?</a>
              <Link to="/register" className={`${linkText}`}>Register Now</Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition ${btnBg} text-white ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
