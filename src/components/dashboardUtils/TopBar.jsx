import React from "react";
import { Search, Sun, Moon, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../security/AuthContext";

const TopBar = ({ search, setSearch, darkMode, setDarkMode, showProfile, setShowProfile }) => {

  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md relative">
      {/* Search */}
      <div className="flex items-center space-x-3">
        <Search size={22} className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none outline-none bg-transparent w-64 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Dark Mode + Profile */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        {/* <motion.button
          onClick={() => setDarkMode((prev) => !prev)}
          className={`relative w-14 h-7 rounded-full flex items-center px-1 ${
            darkMode ? "bg-yellow-400" : "bg-gray-300"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-6 h-6 rounded-full bg-white shadow flex items-center justify-center ${
              darkMode ? "translate-x-7" : ""
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={16} className="text-yellow-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={16} className="text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button> */}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center"
          >
            <User size={20} />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2"
              >
                <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={logout}>
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
