import React from "react";
import { Search, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../security/AuthContext";
import DarkMode from "./DarkMode";
import logo from "/ES_logo.png";
import { useThemeClasses } from "../theme/themeClasses";

const TopBar = ({
  search,
  setSearch,
  showProfile,
  setShowProfile,
  toggleSidebar, // ✅ ensure Dashboard passes this
}) => {
  const { logout } = useAuth();

  const {
    bgClass,
    inputTextClass,
    inputPlaceholderClass,
    profileBgClass,
    dropdownBgClass,
    dropdownHoverClass,
    dropdownTextClass,
    iconColor,
    textClass,
  } = useThemeClasses();

  return (
    <div
      className={`flex items-center justify-between p-1 sm:p-1 shadow-lg sticky top-0 z-30 ${bgClass}`}
    >
      {/* Left section (Menu + Search) */}
      <div className="flex items-center gap-3 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Open Sidebar"
        >
          <img
            src={logo}
            alt="EventServices Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded"
          />
        </button>

        {/* Search Bar */}
        <div
          className="flex items-center bg-transparent border border-gray-300 dark:border-gray-700 
           rounded-xl px-4 sm:px-6 py-2 sm:py-3 w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
        >
          <Search
            size={22}
            className={`${iconColor} mr-3 sm:mr-4 flex-shrink-0`}
          />
          <input
            type="text"
            placeholder="Search vendors, services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full bg-transparent border-none outline-none text-base sm:text-lg md:text-xl 
              ${inputTextClass} ${inputPlaceholderClass}`}
          />
        </div>
      </div>

      {/* Right section (Dark mode + Profile) */}
      <div className="flex items-center gap-4 sm:gap-6 ml-3 sm:ml-8">
        <DarkMode />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${profileBgClass} flex items-center justify-center`}
            title="Profile"
          >
            <User size={22} className={dropdownTextClass} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`absolute right-0 mt-3 w-40 sm:w-48 rounded-xl shadow-xl p-3 ${dropdownBgClass}`}
              >
                <button
                  className={`block w-full text-left px-4 py-2 rounded-lg text-base ${dropdownHoverClass} ${dropdownTextClass}`}
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
  )  
};

export default TopBar;
