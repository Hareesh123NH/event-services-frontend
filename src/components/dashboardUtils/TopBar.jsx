import React, { useContext } from "react";
import { Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../security/AuthContext";
import { ThemeContext } from "../ThemeContext";

const TopBar = ({ search, setSearch, showProfile, setShowProfile }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Dynamic classes based on theme
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const inputTextClass = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const inputPlaceholderClass = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";
  const btnBgClass = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black";
  const profileBgClass = theme === "dark" ? "bg-gray-700" : "bg-gray-300";
  const dropdownBgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const dropdownHoverClass = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const iconColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`flex items-center justify-between p-4 shadow-md relative ${bgClass}`}>
      {/* Search */}
      <div className="flex items-center space-x-3">
        <Search size={22} className={iconColor} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border-none outline-none bg-transparent w-64 ${inputTextClass} ${inputPlaceholderClass}`}
        />
      </div>

      {/* Dark Mode + Profile */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded ${btnBgClass}`}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`w-9 h-9 rounded-full ${profileBgClass} flex items-center justify-center`}
          >
            <User size={20} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg p-2 ${dropdownBgClass}`}
              >
                <button
                  className={`block w-full text-left px-4 py-2 rounded ${dropdownHoverClass}`}
                  onClick={logout}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
