import React, { useState } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";


const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-100 to-indigo-200">
      {/* Left Side - Image */}
      <LeftSideImage
        url={
          "https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png"
        }
      />
      {/* Right Side - Login Form */}
      <div className="md:w-1/2 w-full bg-white flex justify-center items-center p-8 md:p-16">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <a href="#" className="hover:text-purple-600">
                Forgot Password?
              </a>
              <a href="/register" className="hover:text-purple-600">
                Register Now
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Login
            </button>

            <div className="flex items-center justify-center mt-4">
              <div className="border-t w-1/4 border-gray-300"></div>
              <p className="text-gray-500 mx-2">or</p>
              <div className="border-t w-1/4 border-gray-300"></div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                <img src="/google-icon.svg" alt="Google" className="h-6 w-6" />
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
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
