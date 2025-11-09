import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-lg">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">

        {/* Logo / Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl font-bold text-white drop-shadow-md tracking-wide cursor-pointer"
        >
          <Link to="/">Event Services</Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 bg-white/20 border border-white/20 text-white rounded-full backdrop-blur-md hover:bg-white/30 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
          >
            Register
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/10 shadow-lg"
          >
            <div className="flex flex-col items-center py-5 space-y-4 text-white">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-3/4 text-center py-2 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="w-3/4 text-center py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
              >
                Register
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNav;
