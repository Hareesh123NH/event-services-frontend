import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";

const MobileBottomNav = ({ sidebarOptions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bgClass, textClass, hoverClass } = useThemeClasses();

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex justify-around items-center py-2 shadow-md border-t ${bgClass} md:hidden z-50`}
    >
      {sidebarOptions.map((item) => {
        const isActive = location.pathname.includes(item.path);
        const Icon = item.icon;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center transition-all duration-200 rounded-lg px-3 py-1 ${
              isActive
                ? "text-blue-500 font-semibold"
                : `${textClass} ${hoverClass}`
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
