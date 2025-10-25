import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../theme/ThemeContext";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";


const DarkMode = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <motion.button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full flex items-center px-1 ${theme === "dark" ? "bg-gray-300" : "bg-yellow-400"}`}
            whileTap={{ scale: 0.9 }}
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-6 h-6 rounded-full bg-white shadow flex items-center justify-center ${theme === "dark" ? "" : "translate-x-7"
                    }`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                        <motion.div
                            key="moon"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Moon size={16} className="text-gray-700" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun size={16} className="text-yellow-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.button>

    )
}

export default DarkMode;