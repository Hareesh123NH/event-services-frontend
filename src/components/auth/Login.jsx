import React, { useState } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { useThemeClasses } from "../theme/themeClasses";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      name: "John Doe",
      role: formData.role,
      token: "fake-jwt-token",
    };

    login(userData);
    navigate("/dashboard");
  };




  const { pageBg, formBg, inputBg, labelColor, linkText, btnBg, authButton } = useThemeClasses();
  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${pageBg}`}>
      {/* Left Side - Image */}
      <LeftSideImage
        url={
          "https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png"
        }
      />

      {/* Right Side - Login Form */}
      <div className={`md:w-1/2 w-full flex justify-center items-center p-8 md:p-16 ${formBg}`}>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex justify-between items-center text-sm">
              <a href="#" className={`${linkText}`}>
                Forgot Password?
              </a>
              <Link to="/register" className={`${linkText}`}>
                Register Now
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold transition ${btnBg} text-white`}
            >
              Login
            </button>

            <div className="flex items-center justify-center mt-4">
              <div className="border-t w-1/4 border-gray-300"></div>
              <p className="mx-2 text-gray-500">or</p>
              <div className="border-t w-1/4 border-gray-300"></div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button
                type="button"
                className={`border px-4 py-2 rounded-lg hover:bg-opacity-80 transition ${authButton}`}
              >
                <img src="/google-icon.svg" alt="Google" className="h-6 w-6" />
              </button>
              <button
                type="button"
                className={`border px-4 py-2 rounded-lg hover:bg-opacity-80 transition ${authButton}`}
              >
                <img src="/apple-icon.svg" alt="Apple" className="h-6 w-6" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
