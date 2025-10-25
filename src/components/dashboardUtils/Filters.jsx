import React, { useContext } from "react";
import { filtersList } from "../data/duplicatedata";
import { useThemeClasses } from "../theme/themeClasses";



const Filters = ({ activeFilter, setActiveFilter }) => {

  const filters = filtersList;

  // Dynamic classes based on theme
  const { bgClass, buttonActiveBg, buttonInactiveBg} = useThemeClasses();
  
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
