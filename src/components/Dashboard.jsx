import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";
import Filters from "./dashboardUtils/Filters";
import VendorGrid from "./dashboardUtils/VendorGrid";
import VendorDetail from "./dashboardUtils/vendordetail";

import {
  mockVendors,
  filtersList, orderData, sidebarOptions,
  vendorServiceDetails,
  pendingOrders,
  vendorRegistrations,
  vendorServices,
} from "./data/duplicatedata";
import UserHistory from "./order/UserHistory";
import ProfilePage from "./accounts/Profile";
import BookOrder from "./order/BookOrder";
import VendorPendingOrders from "./order/VendorPendingOrders";
import VendorRegistrationView from "./admin/VendorRegistrationView";
import VendorServicesManager from "./vendor/VendorServicesManager";
import AddNewVendorService from "./vendor/AddNewVendorService";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [currentView, setCurrentView] = useState("dashboard");

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
        sidebarOptions={sidebarOptions[currentView]}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setCurrentView={setCurrentView}
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
        {/* 
        {currentView === "dashboard" && (
          <>
            <Filters
              filters={filtersList}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            /> */}
        {/* <UserHistory orders={orderData.orders} /> */}
        {/* <VendorGrid vendors={mockVendors} search={search} /> */}
        {/* <VendorDetail vendorItem={vendorServiceDetails.data} /> */}
        {/* <VendorPendingOrders orders={pendingOrders.orders} /> */}
        {/* </> */}
        {/* )} */}

        {currentView === "profile" && <ProfilePage />}
        {/* <BookOrder /> */}
        {/* <VendorRegistrationView vendors={vendorRegistrations} /> */}
        <VendorServicesManager services={vendorServices.services} />
        {/* <AddNewVendorService /> */}
      </div>
    </div>
  );
};

export default Dashboard;
