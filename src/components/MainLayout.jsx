// layouts/MainLayout.jsx
import React, { useContext } from "react";
import HomeNav from "../components/HomeNav";
import { ThemeContext } from "./ThemeContext";

const MainLayout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const pageBg = theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900";
  const footerBg = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900";

  return (
    <div className={`font-sans min-h-screen flex flex-col ${pageBg}`}>
      <HomeNav />
      <main className="flex-1">{children}</main>
      <footer className={`py-6 text-center ${footerBg}`}>
        <p>&copy; 2025 Event Services Platform</p>
      </footer>
    </div>
  );
};

export default MainLayout;
