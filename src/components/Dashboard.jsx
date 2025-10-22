import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";

import {
  sidebarOptions,
} from "./data/duplicatedata";
import { Outlet } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark))
      setDarkMode(true);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">

      <Sidebar
        sidebarOptions={sidebarOptions[user.role]}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />

        {/* <VendorGrid vendors={mockVendors} search={search} /> */}
        <Outlet />

      </div>
    </div>
  );
};

export default Dashboard;
