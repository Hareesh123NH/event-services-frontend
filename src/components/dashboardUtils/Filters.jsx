import React from "react";

const Filters = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div >
      {/* Scrollable Buttons */}
      <div
        id="filterScroll"
        className="flex overflow-x-auto scrollbar-hide space-x-3 p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 items-center"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm text-center flex-shrink-0 ${activeFilter === filter
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
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
