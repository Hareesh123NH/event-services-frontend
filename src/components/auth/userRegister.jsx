import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { Link, useNavigate } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";

const UserRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  // Separate loading states
  const [sendingOtp, setSendingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Message states
  const [otpMessage, setOtpMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const { bgGradient, formBg, labelColor, inputBg, btnBg } = useThemeClasses();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Send OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      setOtpMessage("⚠️ Please enter your email first.");
      return;
    }

    try {
      setSendingOtp(true);
      setOtpMessage("");
      const res = await api.post(`/auth/send-otp?email=${encodeURIComponent(formData.email)}`);
      setOtpSent(true);
      setOtpTimer(30);
      setOtpMessage(res.data.message);
    } catch (err) {
      console.error("OTP send error:", err);
      setOtpMessage(err.response?.data?.message || "❌ Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // Countdown timer for resend OTP
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  // ✅ Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterMessage("");
    setRegistering(true);

    try {
      const res = await api.post("/auth/user-signup", formData);
      setRegisterMessage(res.data.message || "🎉 Registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setRegisterMessage(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row items-center justify-center ${bgGradient}`}>
      {/* Left Side Image */}
      <div className="hidden md:flex md:w-1/2">
        <LeftSideImage url="https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png" />
      </div>

      {/* Right Form */}
      <div className={`w-full md:w-1/2 flex justify-center items-center px-5 sm:px-8 py-10 md:py-16 ${formBg}`}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <h2 className="p-4 text-2xl sm:text-3xl font-bold text-center text-purple-600 mb-6 sm:mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Full Name */}
            <div>
              <label className={`block font-medium mb-1 sm:mb-2 ${labelColor}`}>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email + Send OTP */}
            <div>
              <label className={`block font-medium mb-1 sm:mb-2 ${labelColor}`}>Email</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`flex-1 px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                  placeholder="example@email.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpTimer > 0 || sendingOtp}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition ${otpTimer > 0 || sendingOtp ? "bg-gray-400 cursor-not-allowed" : btnBg
                    }`}
                >
                  {sendingOtp
                    ? "Sending..."
                    : otpTimer > 0
                      ? `Resend in ${otpTimer}s`
                      : otpSent
                        ? "Resend OTP"
                        : "Send OTP"}
                </button>
              </div>

              {otpMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 text-sm text-center text-purple-600`}
                >
                  {otpMessage}
                </motion.p>
              )}

            </div>

            {/* OTP Field */}
            {otpSent && (
              <div>
                <label className={`block font-medium mb-1 sm:mb-2 ${labelColor}`}>OTP</label>
                <input
                  type="number"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                  placeholder="Enter OTP"
                  required
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className={`block font-medium mb-1 sm:mb-2 ${labelColor}`}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className={`block font-medium mb-1 sm:mb-2 ${labelColor}`}>Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="+91 9876543210"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={registering}
              className={`w-full py-2.5 rounded-lg font-semibold transition ${registering ? "bg-gray-400 cursor-not-allowed" : btnBg
                }`}
            >
              {registering ? "Registering..." : "Register"}
            </button>

            {/* Registration Message */}
            {registerMessage && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-2 text-center text-sm font-medium ${registerMessage.includes("success") ||
                  registerMessage.includes("🎉") ||
                  registerMessage.includes("Successfully")
                  ? "text-green-600"
                  : "text-red-600"
                  }`}
              >
                {registerMessage}
              </motion.p>
            )}

            {/* Links */}
            <div className={`text-center mt-4 text-xs sm:text-sm ${labelColor}`}>
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:underline">
                Login
              </Link>
            </div>

            <div className={`text-center mt-3 text-xs sm:text-sm ${labelColor}`}>
              If you are a vendor,{" "}
              <Link to="/vendor-register" className="text-purple-600 hover:underline">
                Click here
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRegister;
