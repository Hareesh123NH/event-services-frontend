// layouts/MainLayout.jsx
import React from "react";
import HomeNav from "../components/HomeNav";
import { useThemeClasses } from "./theme/themeClasses";

const MainLayout = ({ children }) => {
  const { pageBg, footerBg } = useThemeClasses();

  return (
    <div
      className={`font-sans min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}
    >
      {/* Navigation */}
      <header className="w-full sticky top-0 z-50">
        <HomeNav />
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 py-4">
        {children}
      </main>

      {/* Footer */}
      <footer
        className={`py-4 sm:py-6 text-center text-sm sm:text-base ${footerBg}`}
      >
        <p className="px-2 leading-relaxed">
          &copy; 2025 Event Services Platform
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
