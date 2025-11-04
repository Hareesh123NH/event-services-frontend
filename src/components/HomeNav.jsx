import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./dashboardUtils/DarkMode";
import { useThemeClasses } from "./theme/themeClasses";

const HomeNav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { navBg, navText, btnBg, mobileMenuBg } = useThemeClasses();

  return (
    <nav className={`fixed top-0 w-full shadow z-50 transition-colors duration-300 ${navBg}`}>
      {/* Main navbar container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo / Title */}
        <div className={`text-xl sm:text-2xl font-bold tracking-wide ${navText}`}>
          <Link to="/">Event Services</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-full font-medium transition ${btnBg}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-full font-medium transition ${btnBg}`}
          >
            Register
          </Link>
          <DarkMode />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Menu"
          >
            <svg
              className={`w-7 h-7 ${navText}`}
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden shadow-lg border-t ${mobileMenuBg}`}
          >
            <div className="flex flex-col items-center py-5 space-y-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={`w-3/4 text-center py-2 rounded-full font-medium transition ${btnBg}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={`w-3/4 text-center py-2 rounded-full font-medium transition ${btnBg}`}
              >
                Register
              </Link>
              <div className="mt-2">
                <DarkMode />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNav;
