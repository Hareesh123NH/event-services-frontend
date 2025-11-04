import React from "react";
import { Search, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../security/AuthContext";
import DarkMode from "./DarkMode";
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
      className={`flex items-center justify-between p-4 sm:p-4 shadow-md sticky top-0 z-30 ${bgClass}`}
    >
      {/* Left section (Menu + Search) */}
      <div className="flex items-center gap-2 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Open Sidebar"
        >
          <Menu size={22} className={iconColor} />
        </button>

        {/* Search Bar */}
        <div
          className="flex items-center bg-transparent border border-gray-300 dark:border-gray-700 
             rounded-lg px-3 sm:px-4 sm:py-2 w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto"
        >
          <Search
            size={18}
            className={`${iconColor} mr-2 sm:mr-3 flex-shrink-0`}
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full bg-transparent border-none outline-none text-sm sm:text-base md:text-lg 
                ${inputTextClass} ${inputPlaceholderClass}`}
          />
        </div>

      </div>

      {/* Right section (Dark mode + Profile) */}
      <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-6">
        <DarkMode />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${profileBgClass} flex items-center justify-center`}
            title="Profile"
          >
            <User size={18} className={dropdownTextClass} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`absolute right-0 mt-2 w-36 sm:w-40 rounded-lg shadow-lg p-2 ${dropdownBgClass}`}
              >
                <button
                  className={`block w-full text-left px-4 py-2 rounded ${dropdownHoverClass} ${dropdownTextClass}`}
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
