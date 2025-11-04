import React from "react";
import { filtersList } from "../data/duplicatedata";
import { useThemeClasses } from "../theme/themeClasses";

const Filters = ({ activeFilter, setActiveFilter }) => {
  const filters = filtersList;

  const { bgClass, buttonActiveBg, buttonInactiveBg } = useThemeClasses();

  return (
    <div>
      {/* Scrollable Buttons */}
      <div
        id="filterScroll"
        className={`flex overflow-x-auto scrollbar-hide space-x-3 p-2 border-b items-center ${bgClass}`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm md:text-base text-center flex-shrink-0 transition-all duration-200 ${
              activeFilter === filter ? buttonActiveBg : buttonInactiveBg
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
