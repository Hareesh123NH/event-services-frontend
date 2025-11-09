import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import happy1 from "../../../public/happy1.png";
import happy2 from "../../../public/happy2.png";
import happy3 from "../../../public/happy1.png";

import sad1 from "../../../public/sad.webp";
import sad2 from "../../../public/sad.webp";
import sad3 from "../../../public/sad.webp";

import angry1 from "../../../public/angry1.png";
import angry2 from "../../../public/angry2.png";
import angry3 from "../../../public/angry1.png";

export default function UserRegister() {
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

  const [sendingOtp, setSendingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);

  const [otpMessage, setOtpMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const [hovered, setHovered] = useState(null);
  const [error, setError] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      setOtpMessage(err.response?.data?.message || "❌ Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  useEffect(() => {
    if (otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer((x) => x - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterMessage("");
    setRegistering(true);
    try {
      const res = await api.post("/auth/user-signup", formData);
      setRegisterMessage(res.data.message || "🎉 Registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(true);
      setRegisterMessage(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  return (

    <div
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      className="min-h-[calc(100vh-72px-64px)] sm:min-h-[calc(100vh-80px-96px)] flex items-center justify-center px-4 sm:px-6"
    >

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-28 items-center overflow-hidden">

        {/* LEFT SIDE - FACES */}
        <div className="hidden md:flex flex-col justify-center pl-16">
          <div className="flex items-center gap-3">
            <motion.img
              src={hovered === "left" ? angry1 : error ? sad1 : happy1}
              className="w-28 drop-shadow-2xl"
              animate={{
                x: (mouse.x - window.innerWidth / 2) * 0.009,
                y: hovered === "left" ? -40 : (mouse.y - window.innerHeight / 2) * 0.009,
                scale: hovered === "left" ? 1.2 : error ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 8 }}
              onMouseEnter={() => setHovered("left")}
              onMouseLeave={() => setHovered(null)}
            />

            <motion.img
              src={hovered === "center" ? angry2 : error ? sad2 : happy2}
              className="w-56 drop-shadow-2xl"
              animate={{
                x: (mouse.x - window.innerWidth / 2) * 0.015,
                y: hovered === "center" ? -55 : (mouse.y - window.innerHeight / 2) * 0.015,
                scale: hovered === "center" ? 1.3 : error ? 0.85 : 1,
              }}
              transition={{ type: "spring", stiffness: 230, damping: 10 }}
              onMouseEnter={() => setHovered("center")}
              onMouseLeave={() => setHovered(null)}
            />

            <motion.img
              src={hovered === "right" ? angry3 : error ? sad3 : happy3}
              className="w-28 drop-shadow-2xl"
              animate={{
                x: (mouse.x - window.innerWidth / 2) * -0.008,
                y: hovered === "right" ? -40 : (mouse.y - window.innerHeight / 2) * -0.008,
                scale: hovered === "right" ? 1.2 : error ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 8 }}
              onMouseEnter={() => setHovered("right")}
              onMouseLeave={() => setHovered(null)}
            />
          </div>

          <h2 className="mt-6 text-white text-3xl font-bold">
            {error
              ? "Oh no!"
              : hovered
                ? "Stop poking me 😡"
                : "Create your Account 👋"}
          </h2>

          <p className="text-[#e8d7ff] text-sm">
            {error
              ? "Something went wrong 😞"
              : hovered
                ? "I am watching you 😤"
                : "Let’s setup your profile"}
          </p>
        </div>

        {/* RIGHT SIDE — REGISTRATION CARD */}
        <div className="flex justify-center px-0 sm:px-0">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 sm:p-8 shadow-2xl relative">

            <h1 className="text-white text-2xl sm:text-3xl font-extrabold text-center">Register</h1>

            {registerMessage && (
              <div
                className={`mt-3 sm:mt-4 text-xs sm:text-sm p-2 sm:p-3 rounded text-center transition-all duration-200
              ${registerMessage.includes("success") || registerMessage.includes("🎉")
                    ? "text-green-300 bg-green-900/20"
                    : "text-red-300 bg-red-900/20"
                  }`}
              >
                {registerMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-5 sm:mt-6 text-sm sm:text-base">

              {/* Full Name */}
              <div>
                <label className="block text-xs sm:text-sm text-[#d9cfff] mb-2">Full Name</label>
                <input
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>

              {/* Email + OTP */}
              <div>
                <label className="block text-xs sm:text-sm text-[#d9cfff] mb-2">Email</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none"
                    placeholder="example@email.com"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpTimer > 0 || sendingOtp}
                    className="px-3 sm:px-4 py-2 rounded-lg bg-purple-600 text-xs sm:text-sm text-white font-semibold hover:opacity-95 disabled:opacity-60 transition-all duration-200"
                  >
                    {sendingOtp
                      ? "Sending..."
                      : otpTimer > 0
                        ? `Wait ${otpTimer}s`
                        : otpSent
                          ? "Resend"
                          : "Send OTP"}
                  </button>
                </div>
                {otpMessage && (
                  <p className="text-purple-200 text-xs sm:text-sm mt-1 text-center">{otpMessage}</p>
                )}
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div>
                  <label className="block text-xs sm:text-sm text-[#d9cfff] mb-2">OTP</label>
                  <input
                    name="otp"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    type="number"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                    placeholder="Enter OTP"
                  />
                </div>
              )}

              {/* Password */}
              <div className="relative">
                <label className="block text-xs sm:text-sm text-[#d9cfff] mb-2">Password</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white pr-10 sm:pr-12 transition-all duration-200"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[45px] sm:top-[50px] -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs sm:text-sm text-[#d9cfff] mb-2">Phone Number</label>
                <input
                  name="phone_number"
                  required
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="+91 9876543210"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={registering}
                className="w-full py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm sm:text-base hover:opacity-95 disabled:opacity-60 transition-all duration-200"
              >
                {registering ? "Registering..." : "Register"}
              </button>

              <p className="text-center text-xs sm:text-sm text-[#d9cfff] mt-3 sm:mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-200 hover:underline">
                  Login
                </Link>
              </p>

              <p className="text-center text-xs sm:text-sm text-[#d9cfff] mt-1">
                Are you a vendor?{" "}
                <Link to="/vendor-register" className="text-purple-200 hover:underline">
                  Register Here
                </Link>
              </p>
            </form>

            <div className="absolute -left-10 -top-8 w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 blur-2xl opacity-60" />
          </div>
        </div>
      </div>
    </div>

  );
}
