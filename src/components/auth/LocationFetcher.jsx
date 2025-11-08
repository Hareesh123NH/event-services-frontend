import React, { useEffect, useState } from "react";

const LocationFetcher = () => {
  const [coords, setCoords] = useState(() => {
    const saved = localStorage.getItem("coords");
    return saved ? JSON.parse(saved) : null;
  });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported by this browser"));
        } else {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      });
    };

    const fetchLocationAndAddress = async () => {
      try {
        let latitude, longitude;

        // ✅ Step 1: Use cached coords if available
        if (coords) {
          ({ latitude, longitude } = coords);
          console.log("Using saved coordinates:", latitude, longitude);
        } else {
          // Ask for location only once
          const position = await getLocation();
          ({ latitude, longitude } = position.coords);
          setCoords({ latitude, longitude });
          localStorage.setItem("coords", JSON.stringify({ latitude, longitude }));
          console.log("New coordinates:", latitude, longitude);
        }

        // ✅ Step 2: Reverse geocode into address
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();

        const addr = data.address || {};
        const fullAddress = [
          addr.road,
          addr.suburb,
          addr.city || addr.town || addr.village,
          addr.state,
          addr.postcode,
          addr.country,
        ]
          .filter(Boolean)
          .join(", ");

        setAddress(fullAddress);
        console.log("Detected Address:", fullAddress);
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Please allow location access in your browser.");
      }
    };

    fetchLocationAndAddress();
  }, [coords]);

  const refreshLocation = () => {
    localStorage.removeItem("coords");
    setCoords(null);
    setAddress(null);
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">📍 Device Location Access</h2>

      {coords ? (
        <p>
          <strong>Latitude:</strong> {coords.latitude} <br />
          <strong>Longitude:</strong> {coords.longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}

      {address && (
        <p className="mt-3 text-green-700">
          <strong>Detected Address:</strong> {address}
        </p>
      )}

      <button
        onClick={refreshLocation}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Refresh Location
      </button>
    </div>
  );
};

export default LocationFetcher;
