// layouts/MainLayout.jsx
import React from "react";
import HomeNav from "../components/HomeNav";
import { useThemeClasses } from "./theme/themeClasses";

const MainLayout = ({ children }) => {

  const { pageBg, footerBg } = useThemeClasses();

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
