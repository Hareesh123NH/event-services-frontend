// layouts/MainLayout.jsx
import React from "react";
import HomeNav from "../components/HomeNav";

const MainLayout = ({ children }) => {
  return (
    <div className="font-sans">
      <HomeNav />
      {children}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Event Services Platform</p>
      </footer>
    </div>
  );
};

export default MainLayout;
