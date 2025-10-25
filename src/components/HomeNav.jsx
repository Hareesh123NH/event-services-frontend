import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./dashboardUtils/DarkMode";

import { useThemeClasses } from "./theme/themeClasses";

const HomeNav = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const { navBg, navText, btnBg, mobileMenuBg } = useThemeClasses();

    return (
        <>
            {/* Navbar */}
            <nav className={`fixed top-0 w-full shadow z-50 ${navBg}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className={`text-2xl font-bold ${navText}`}>
                        <Link to="/">Event Services</Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/login"
                            className={`px-3 flex items-center justify-center h-7 rounded-full transition ${btnBg}`}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className={`px-3 flex items-center justify-center h-7 rounded-full transition ${btnBg}`}
                        >
                            Register
                        </Link>
                        <DarkMode />
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className={`w-8 h-8 ${navText}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`md:hidden shadow-lg ${mobileMenuBg}`}
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            <Link
                                to="/login"
                                className={`px-4 py-2 rounded-lg transition ${btnBg}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className={`px-4 py-2 rounded-lg transition ${btnBg}`}
                            >
                                Register
                            </Link>
                            <DarkMode />
                        </div>
                    </motion.div>
                )}
            </nav>
        </>
    );
};

export default HomeNav;
