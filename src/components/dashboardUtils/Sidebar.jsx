import React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <motion.aside
            initial={{ width: 0 }}
            animate={{ width: isSidebarOpen ? 220 : 70 }}
            className="bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col transition-all duration-300"
        >
            <div className="flex items-center justify-between p-4">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-gray-700 dark:text-gray-200"
                >
                    <Menu size={24} />
                </button>
                {isSidebarOpen && <h1 className="font-bold text-xl ml-2">EventServices</h1>}
            </div>

            {isSidebarOpen && (
                <nav className="flex-1 overflow-y-auto p-2">
                    {["Home", "Subscriptions", "Library", "History"].map((item) => (
                        <button
                            key={item}
                            className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            )}
        </motion.aside>
    );
};

export default Sidebar;
