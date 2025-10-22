import React, { useContext } from "react";
import { filtersList } from "../data/duplicatedata";
import { ThemeContext } from "../ThemeContext";


const Filters = ({ activeFilter, setActiveFilter }) => {
  const { theme } = useContext(ThemeContext);
  const filters = filtersList;

  // Dynamic classes based on theme
  const bgClass = theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-200 text-gray-900";
  const buttonActiveBg = theme === "dark" ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white";
  const buttonInactiveBg = theme === "dark" ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-white text-gray-700 hover:bg-gray-200";

  return (
    <div>
      {/* Scrollable Buttons */}
      <div
        id="filterScroll"
        className={`flex overflow-x-auto scrollbar-hide space-x-3 p-3 border-b items-center ${bgClass}`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm text-center flex-shrink-0 ${activeFilter === filter ? buttonActiveBg : buttonInactiveBg
              }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
