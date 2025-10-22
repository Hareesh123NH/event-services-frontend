// import React from "react";
// import { motion } from "framer-motion";
// import { Menu } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({ sidebarOptions, isSidebarOpen, setIsSidebarOpen }) => {
//     const navigate = useNavigate();

//     return (
//         <motion.aside
//             initial={{ width: 0 }}
//             animate={{ width: isSidebarOpen ? 220 : 70 }}
//             className="bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col transition-all duration-300"
//         >
//             <div className="flex items-center justify-between p-4">
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="text-gray-700 dark:text-gray-200"
//                 >
//                     <Menu size={24} />
//                 </button>
//                 {isSidebarOpen && <h1 className="font-bold text-xl ml-2">EventServices</h1>}
//             </div>

//             {isSidebarOpen && (
//                 <nav className="flex-1 overflow-y-auto p-2">
//                     {sidebarOptions.map((item) => (
//                         <button
//                             key={item.path}
//                             onClick={() => navigate(item.path)}
//                             className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//                         >
//                             {item.label}
//                         </button>
//                     ))}
//                 </nav>
//             )}
//         </motion.aside>
//     );
// };

// export default Sidebar;

import React from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOptions, isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.aside
      initial={{ width: 70 }}
      animate={{ width: isSidebarOpen ? 220 : 70 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 shadow-lg h-full flex flex-col transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 dark:text-gray-200"
        >
          <Menu size={22} />
        </button>
        {isSidebarOpen && (
          <h1 className="font-bold text-lg text-gray-800 dark:text-gray-100 ml-2 whitespace-nowrap">
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
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                <span className="absolute left-16 top-2.5 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20">
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

