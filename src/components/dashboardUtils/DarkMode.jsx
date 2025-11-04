import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../theme/ThemeContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DarkMode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className={`relative flex items-center rounded-full px-0.5 sm:px-1 transition-all duration-300 
        ${theme === "dark" ? "bg-gray-300" : "bg-yellow-400"}
        w-10 h-5 sm:w-14 sm:h-7`}  // 👈 smaller for mobile, normal for larger screens
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`rounded-full bg-white shadow flex items-center justify-center
          w-4 h-4 sm:w-6 sm:h-6
          ${theme === "dark" ? "translate-x-0" : "translate-x-5 sm:translate-x-7"}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.25 }}
            >
              <Moon size={12} className="text-gray-700 sm:size-[16px]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
            >
              <Sun size={12} className="text-yellow-500 sm:size-[16px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default DarkMode;
