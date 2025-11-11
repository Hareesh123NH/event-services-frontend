import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";
import { sidebarOptions } from "./data/duplicatedata";
import { Outlet } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useThemeClasses } from "./theme/themeClasses";
import MobileBottomNav from "./dashboardUtils/MobileBottomNav";

const Dashboard = () => {
  const { user } = useAuth();
  const { bgClass, textClass } = useThemeClasses();

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for mobile/desktop responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Auto open on desktop, close on mobile
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`flex h-screen ${bgClass} ${textClass}`}>
      {/* Overlay for Mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 transform top-0 left-0 h-full transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <Sidebar
          sidebarOptions={sidebarOptions[user.role]}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          search={search}
          setSearch={setSearch}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Scrollable Outlet area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 pb-[70px] md:pb-0">
          <Outlet context={{ search }}/>
        </main>


        <MobileBottomNav sidebarOptions={sidebarOptions[user.role]} />

      </div>
    </div>
  );
};

export default Dashboard;
