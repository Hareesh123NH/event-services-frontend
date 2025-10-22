import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";
import { sidebarOptions } from "./data/duplicatedata";
import { Outlet } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { ThemeContext } from "./ThemeContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Theme-based classes
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textClass = theme === "dark" ? "text-gray-100" : "text-gray-900";

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
