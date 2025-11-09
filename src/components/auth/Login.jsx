import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import api from "../axiosConfig";
import { useAuth } from "../security/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import happy1 from "../../assets/happy1.png";
import happy2 from "../../assets/happy2.png";
import happy3 from "../../assets/happy1.png";

import sad1 from "../../assets/sad.webp";
import sad2 from "../../assets/sad.webp";
import sad3 from "../../assets/sad.webp";

import angry1 from "../../assets/angry1.png";
import angry2 from "../../assets/angry2.png";
import angry3 from "../../assets/angry1.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [hovered, setHovered] = useState(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email: email, password: password, role: role });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      login(user);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials");
      } else {
        setError("Unable to connect to the server");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      className="min-h-[calc(100vh-72px-64px)] sm:min-h-[calc(100vh-80px-96px)] flex items-center justify-center px-4 sm:px-6"
    >

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-28 items-center">

        {/* LEFT SIDE — CHARACTER IMAGES */}
        <div className="hidden md:flex flex-col justify-center pl-10">
          <div className="flex items-center gap-3">
            {/* SMALL LEFT */}
            <motion.img
              src={hovered === "left" ? angry1 : error ? sad1 : happy1}
              alt="left-face"
              className="w-20 lg:w-28 pointer-events-auto drop-shadow-2xl"
              animate={{
                x: (mouse.x - window.innerWidth / 2) * 0.009,
                y: hovered === "left" ? -40 : (mouse.y - window.innerHeight / 2) * 0.009,
                scale: hovered === "left" ? 1.2 : error ? 0.9 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 8 }}
              onMouseEnter={() => setHovered("left")}
              onMouseLeave={() => setHovered(null)}
            />

            {/* BIG CENTER */}
            <motion.img
              src={hovered === "center" ? angry2 : error ? sad2 : happy2}
              alt="center-face"
              className="w-40 lg:w-56 pointer-events-auto drop-shadow-2xl"
              animate={{
                x: (mouse.x - window.innerWidth / 2) * 0.015,
                y: hovered === "center" ? -55 : (mouse.y - window.innerHeight / 2) * 0.015,
                scale: hovered === "center" ? 1.3 : error ? 0.85 : 1,
              }}
              transition={{ type: "spring", stiffness: 230, damping: 10 }}
              onMouseEnter={() => setHovered("center")}
              onMouseLeave={() => setHovered(null)}
            />

            {/* SMALL RIGHT */}
            <motion.img
              src={hovered === "right" ? angry3 : error ? sad3 : happy3}
              alt="right-face"
              className="w-20 lg:w-28 pointer-events-auto drop-shadow-2xl"
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

          <h2 className="mt-6 text-white text-2xl lg:text-3xl font-bold">
            {error ? "Oh no!" : hovered ? "Hey! Don't poke me 😡" : "Welcome back, I am Alex 👋"}
          </h2>

          <p className="text-[#e8d7ff] text-xs lg:text-sm mt-1">
            {error ? "Wrong password! Try again 😞" : hovered ? "I am watching you 😤" : "I will check your details!!!"}
          </p>
        </div>

        {/* RIGHT SIDE — Login Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-5 sm:p-8 shadow-2xl relative">

            <h1 className="text-white text-2xl sm:text-3xl font-extrabold text-center">Sign in</h1>

            {error && (
              <div className="mt-3 text-xs sm:text-sm text-red-300 bg-red-900/20 p-2 sm:p-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5 mt-5 sm:mt-6">

              {/* EMAIL */}
              <div>
                <label className="block text-xs sm:text-sm text-[#d9cfff] mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white placeholder-white/60 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="you@email.com"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <label className="text-xs sm:text-sm text-[#d9cfff]">Password</label>
                  <a href="#" className="text-xs sm:text-sm text-purple-200 hover:underline">Forgot?</a>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 rounded-lg bg-white/6 border border-white/8 text-white placeholder-white/60 text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* ROLE */}
              <div>
                <label className="block text-xs sm:text-sm text-[#d9cfff] mb-1 sm:mb-2">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white text-sm sm:text-base outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="user" className="text-black">User</option>
                  <option value="vendor" className="text-black">Vendor</option>
                  <option value="admin" className="text-black">Admin</option>
                </select>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm sm:text-base hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Checking..." : "Sign In"}
              </button>

              <div className="pt-2 sm:pt-3">
                <div className="flex items-center gap-2 justify-center text-xs sm:text-sm text-[#cfc0ff]">
                  <span>or continue with</span>
                </div>

                <div className="mt-2 sm:mt-3 grid grid-cols-1 gap-1">
                  <button type="button" className="py-2 rounded-lg border border-white/8 bg-white/4 text-white text-xs sm:text-sm">Google</button>
                </div>
              </div>

              <p className="text-center text-xs sm:text-sm text-[#d9cfff] mt-3 sm:mt-4">
                Don’t have an account?{" "}
                <Link to="/register" className="text-purple-200 hover:underline">
                  Sign up
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
