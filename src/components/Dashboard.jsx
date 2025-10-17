import React, { useState, useEffect } from "react";
import Sidebar from "./dashboardUtils/Sidebar";
import TopBar from "./dashboardUtils/TopBar";
import Filters from "./dashboardUtils/Filters";
import VideoGrid from "./dashboardUtils/VideoGrid"

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

const videosList = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: `Video ${i + 1}`,
    thumbnail: `https://picsum.photos/400/250?random=${i + 1}`,
}));

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

                <VideoGrid videos={videosList} search={search} />
            </div>
        </div>
    );
};

export default Dashboard;
