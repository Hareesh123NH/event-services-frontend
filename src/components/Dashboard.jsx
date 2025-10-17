import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";
import Filters from "./dashboardUtils/Filters";
import VendorGrid from "./dashboardUtils/VendorGrid"

const filtersList = [
    "All",
    "Music",
    "Telugu cinema",
    "Mixes",
    "Bigg Boss",
    "Anirudh Ravichander",
    "Anushka Shetty",
    "Yuvan Shankar Raja",
    "JavaScript",
    "Live",
    "User interface design",
    "A. R. Rahman",
    "Data Structures",
    "Dramedy",
];

const response = { "success": true, "message": "Nearby vendor services fetched successfully", "data": [{ "_id": "68edef4d46a4f31f05973ab3", "vendor": { "_id": "68d7a2ff5512a8fa806df70c", "full_name": "Vendor1", "email": "gbhuvana938@gmail.com", "phone_number": "9876543210", "location": { "type": "Point", "coordinates": [77.5946, 12.9716] } }, "service": { "service_name": "Decoration", "description": "Beautiful event decoration including flowers, lighting, and stage setup" }, "final_price": 1800, "average_rating": 2.5, "total_bookings": 0, "distance": 0 }], "pagination": { "total": 1, "page": 1, "limit": 5, "totalPages": 1 } }

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [search, setSearch] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [showProfile, setShowProfile] = useState(false);



    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) setDarkMode(true);
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
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar
                    search={search}
                    setSearch={setSearch}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    showProfile={showProfile}
                    setShowProfile={setShowProfile}
                />

                <Filters
                    filters={filtersList}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                />

                <VendorGrid vendors={response.data} search={search} />
            </div>
        </div>
    );
};

export default Dashboard;
