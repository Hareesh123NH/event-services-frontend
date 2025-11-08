import React, { useEffect, useState } from "react";
import { filtersList } from "../data/duplicatedata";
import { useThemeClasses } from "../theme/themeClasses";
import { useNavigate } from "react-router-dom";
import { LocateFixed, RefreshCcwDot } from "lucide-react";
import { getAccuratePosition } from "../user/location";

const Filters = ({
  activeFilter,
  setActiveFilter,
  maxDistance,
  setMaxDistance,
  useLocation,
  setUseLocation,
  setCoords,
  setPage
}) => {
  const navigate = useNavigate();
  const filters = filtersList;

  const distanceOptions = [100, 200, 300, 500, 1000];

  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleLocationClick = async () => {
    try {
      setLoadingLocation(true);
      // Simulate fetching location
      const position = await getAccuratePosition();
      localStorage.setItem("coords", JSON.stringify([position.lon, position.lat]));
      setCoords([position.lon, position.lat]);
      setUseLocation(true);
    } catch (err) {
      if (err.code === 1) console.warn("Location permission denied")
      else console.error("Error fetching location:", err);
      console.error("Error fetching location:", err);
      setUseLocation(false);
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    const coords = localStorage.getItem("coords");
    if (!coords) handleLocationClick();
  }, []);

  const { bgClass, buttonActiveBg, buttonInactiveBg, textPrimary, textSecondary } = useThemeClasses();

  return (
    <>
      <div className={`border-b ${bgClass}`}>
        {/* Scrollable Filter Buttons */}
        <div
          id="filterScroll"
          className="flex overflow-x-auto scrollbar-hide space-x-3 p-2 items-center"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setPage(1);
                setActiveFilter(filter);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm md:text-base flex-shrink-0 transition-all duration-200 ${activeFilter === filter ? buttonActiveBg : buttonInactiveBg
                }`}
            >
              {filter}
            </button>
          ))}


        </div>
      </div>
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto px-2"
      >
        {/* 🔹 Max Distance Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label
            className={`text-xs sm:text-sm ${textSecondary}`}
            htmlFor="maxDistance"
          >
            Max Distance:
          </label>
          <select
            id="maxDistance"
            value={maxDistance}
            onChange={(e) => {
              const maxD = Number(e.target.value);
              setPage(1)
              setMaxDistance(maxD);
            }}
            className={`text-xs sm:text-sm px-2 py-1 rounded border w-full sm:w-auto ${bgClass} ${textPrimary}`}

          >
            {distanceOptions.map((d) => (
              <option key={d} value={d}>
                {d} km
              </option>
            ))}
          </select>
        </div>

        {/* 🔹 Address/Location Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label
            className={`text-xs sm:text-sm whitespace-nowrap ${textSecondary}`}
            htmlFor="addressSelect"
          >
            Address:
          </label>

          <select
            id="addressSelect"
            value={useLocation ? "location" : "address"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "change") {
                navigate("/dashboard/profile#address");
              } else {
                setUseLocation(value === "location");
              }
            }}
            className={`text-xs sm:text-sm px-2 py-1 rounded border w-full sm:w-auto ${bgClass} ${textPrimary}`}          >
            <option value="location">Live Location</option>
            {localStorage.getItem("addressId") && (
              <option value="address">Default Address</option>
            )}
            <option value="change">Address Settings</option>
          </select>


          <button
            onClick={handleLocationClick}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Reload location"
          >
            {loadingLocation ? (
              <RefreshCcwDot className="w-5 h-5 text-blue-600 animate-spin" />
            ) : (
              <LocateFixed className="w-10 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>

    </>
  );
};

export default Filters;
