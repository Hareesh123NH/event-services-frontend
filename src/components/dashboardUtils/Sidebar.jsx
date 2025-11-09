import React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";
import logo from "/ES_logo.png";

const Sidebar = ({ sidebarOptions, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { bgClass, textClass, hoverClass, tooltipClass } = useThemeClasses();

  return (
    <motion.aside
      initial={{ width: 70 }}
      animate={{
        width: isSidebarOpen ? "auto" : 70, // expand based on content only
      }}
      transition={{ duration: 0.3 }}
      className={`${bgClass} shadow-lg h-full flex flex-col transition-all duration-300 whitespace-nowrap`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`${textClass} focus:outline-none`}
        >
        </button>

        {isSidebarOpen && (
          <Link
            to="/dashboard/home"
            className="flex items-center gap-2 ml-2 hover:opacity-90 transition-all"
          >
            <img
              src={logo}
              alt="EventServices Logo"
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded"
            />
            <h1 className={`font-bold text-sm sm:text-lg ${textClass}`}>
              EventServices
            </h1>
          </Link>
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
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                  ? "bg-blue-200 text-blue-700"
                  : `${textClass} ${hoverClass}`
                  }`}
              >
                <Icon size={18} className="sm:size-[20px]" />
                {isSidebarOpen && (
                  <span className="font-medium text-xs sm:text-sm md:text-base">
                    {item.label}
                  </span>
                )}
              </button>


              {/* Tooltip for collapsed mode */}
              {!isSidebarOpen && (
                <span
                  className={`absolute left-14 sm:left-16 top-2.5 text-[10px] sm:text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20 ${tooltipClass}`}
                >
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
