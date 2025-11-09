// layouts/MainLayout.jsx
import React from "react";
import HomeNav from "../components/HomeNav";

const MainLayout = ({ children }) => {
  return (
    <div className="font-sans bg-gradient-to-br from-[#0f0620] via-[#1b0740] to-[#3b0f5a] relative">

      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-xl bg-white/10 border-b border-white/10 shadow-lg">
        <HomeNav />
      </div>

      {/* Spacer for Navbar height */}
      <div className="h-[72px] sm:h-[80px]"></div>

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-4 sm:py-6 text-center text-sm sm:text-base bg-white/10 backdrop-blur-xl border-t border-white/10 shadow-inner mt-6">
        <p className="px-2 leading-relaxed text-white/80">
          © {new Date().getFullYear()} Event Services — Made with ❤️ for Celebrations
        </p>
        <p className="px-2 mt-1 text-white/70">
          📧 <a href="mailto:eventservices.help@gmail.com" className="underline hover:text-white transition">
            eventservices.help@gmail.com
          </a>
        </p>
      </footer>

    </div>
  );
};

export default MainLayout;
