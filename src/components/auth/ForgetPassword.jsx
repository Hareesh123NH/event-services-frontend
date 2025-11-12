import React, { useState } from "react";
import api from "../axiosConfig";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await api.post("/auth/forget-password", { email, role });
      setMessage(res.data.message || "Password reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 to-pink-600 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {message && (
          <div className="text-green-300 bg-green-900/30 p-3 rounded mb-3 text-sm text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-300 bg-red-900/30 p-3 rounded mb-3 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-purple-200 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm text-purple-200 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="user" className="text-black">User</option>
              <option value="vendor" className="text-black">Vendor</option>
              <option value="admin" className="text-black">Admin</option>
            </select>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-purple-200 mt-3">
            Back to{" "}
            <Link to="/login" className="underline text-white">
              Sign In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
