import React, { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../axiosConfig";
import { motion } from "framer-motion";

export default function SetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            // ✅ token now sent as part of URL, not in body
            const res = await api.post(`/auth/reset-password/${token}`, { password });
            setSuccess(res.data.message || "Password updated successfully!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid or expired token");
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
                <h2 className="text-white text-2xl font-bold text-center mb-6">Set New Password</h2>

                {success && (
                    <div className="text-green-300 bg-green-900/30 p-3 rounded mb-3 text-sm text-center">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="text-red-300 bg-red-900/30 p-3 rounded mb-3 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="block text-sm text-purple-200 mb-1">New Password</label>
                        <input
                            type={show ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 pr-10 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
                        >
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm text-purple-200 mb-1">Confirm Password</label>
                        <input
                            type={show ? "text" : "password"}
                            required
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-95 disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Set Password"}
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
