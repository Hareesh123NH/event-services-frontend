import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";



const Sidebar = ({ sidebarOptions, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Dynamic classes based on theme
  const { bgClass, textClass, hoverClass, tooltipClass} = useThemeClasses();

  return (
    <motion.aside
      initial={{ width: 70 }}
      animate={{ width: isSidebarOpen ? 220 : 70 }}
      transition={{ duration: 0.3 }}
      className={`${bgClass} shadow-lg h-full flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={textClass}
        >
          <Menu size={22} />
        </button>
        {isSidebarOpen && (
          <h1 className={`font-bold text-lg ml-2 whitespace-nowrap ${textClass}`}>
            EventServices
          </h1>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sidebarOptions.map((item) => {
          const isActive = location.pathname.includes(item.path);
          const Icon = item.icon;

          return (
            <div key={item.path} className="relative group">
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-blue-500 text-white"
                    : `${textClass} ${hoverClass}`
                  }`}
              >
                <Icon size={20} />
                {isSidebarOpen && (
                  <span className="font-medium text-sm whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>

              {/* Tooltip for collapsed mode */}
              {!isSidebarOpen && (
                <span className={`absolute left-16 top-2.5 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20 ${tooltipClass}`}>
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
