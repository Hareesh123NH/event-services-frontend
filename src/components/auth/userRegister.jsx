import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { Link, useNavigate } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter email first to send OTP.");
      return;
    }
    setOtpSent(true);
    setOtpTimer(30); // 30 seconds timer
    alert(`OTP sent to ${formData.email}`);
  };

  // Countdown effect with button re-enable
  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    } else if (otpTimer === 0 && otpSent) {
      setOtpSent(false); // re-enable button
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpSent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", formData);
    navigate("/login");
  };

  // ✅ Dynamic styles based on theme
  const { bgGradient, formBg, labelColor, inputBg, btnBg } = useThemeClasses();


  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${bgGradient}`}>
      {/* Left Side - Image */}
      <LeftSideImage
        url={
          "https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png"
        }
      />

      {/* Right Side - Register Form */}
      <div className={`md:w-1/2 w-full ${formBg} flex justify-center items-center p-8 md:p-16`}>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputBg}`}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email + Send OTP */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputBg}`}
                  placeholder="example@email.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSent}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${otpSent ? "bg-gray-400 cursor-not-allowed" : btnBg
                    }`}
                >
                  {otpSent ? `Resend in ${otpTimer}s` : "Send OTP"}
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputBg}`}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputBg}`}
                placeholder="+91 9876543210"
                required
              />
            </div>

            {/* OTP */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>OTP</label>
              <input
                type="number"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${inputBg}`}
                placeholder="Enter OTP"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold transition ${btnBg}`}
            >
              Register
            </button>

            <div className={`text-center mt-4 text-sm ${labelColor}`}>
              Already have an account?{" "}
              <Link to="/login" className={"text-purple-600 hover:underline"}>
                Login
              </Link>
            </div>
            <div className={`text-center mt-4 text-sm ${labelColor}`}>
              If you are a vendor then register here{" "}
              <Link to="/vendor-register" className={"text-purple-600 hover:underline"}>
                Click
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRegister;
