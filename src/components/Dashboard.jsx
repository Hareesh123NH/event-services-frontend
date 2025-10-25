import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";
import { sidebarOptions } from "./data/duplicatedata";
import { Outlet } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useThemeClasses } from "./theme/themeClasses";

const Dashboard = () => {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { bgClass, textClass } = useThemeClasses();

  return (
    <div className={`flex h-screen overflow-hidden ${bgClass} ${textClass}`}>

      <Sidebar
        sidebarOptions={sidebarOptions[user.role]}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          search={search}
          setSearch={setSearch}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />

        {/* Page content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
