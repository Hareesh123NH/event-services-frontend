import React, { useContext } from "react";
import { Search, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../security/AuthContext";

import DarkMode from "./DarkMode";
import { useThemeClasses } from "../theme/themeClasses";

const TopBar = ({ search, setSearch, showProfile, setShowProfile }) => {
  const { logout } = useAuth();


  // Dynamic classes
  const { bgClass, inputTextClass, inputPlaceholderClass, btnBgClass, profileBgClass, dropdownBgClass,dropdownHoverClass,dropdownTextClass,iconColor,textClass} = useThemeClasses
  ();

  

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


        <DarkMode />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`w-9 h-9 rounded-full ${profileBgClass} flex items-center justify-center`}
          >
            <User size={20} className={dropdownTextClass} />
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
