import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { getAccuratePosition, getAddressFromCoords, getCoordsFromAddress } from "./location";
import { CheckCircle, Loader2, LocateFixed, LocateFixedIcon, LucideHardDrive, Map, MapIcon, MapPin, Plus, Save, SaveAll, X } from "lucide-react";

const addressLabels = {
  label: "Label",
  address_line1: "Address Line 1",
  address_line2: "Address Line 2",
  city: "City",
  state: "State",
  postal_code: "Postal Code",
  country: "Country",
  alternate_phone: "Alternate Phone",
};

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { sectionBg, borderClass, textClass } = useThemeClasses();

  return (
    <div className={`${sectionBg} shadow-md rounded-lg mb-6`}>
      <button
        className={`w-full px-4 sm:px-6 py-3 text-left font-semibold text-base sm:text-lg border-b ${borderClass} ${textClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="p-4 sm:p-6">{children}</div>}
    </div>
  );
};

const UserProfile = () => {

  const [profile, setProfile] = useState({
    full_name: ".....",
    email: ".....",
    phone_number: "....."
  });
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [defaultAddressId, setDefaultAddressId] = useState(localStorage.getItem("addressId"));
  const [newAddress, setNewAddress] = useState({
    label: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    alternate_phone: "",
    location: null,
  });

  const [saving, setSaving] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [savingAddress, setSavingAddress] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // ---------- Fetch addresses from backend ----------
  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await api.get("/user/address");
      setAddresses(res.data.addresses);

      if (!defaultAddressId && simplified.length > 0) {
        setDefaultAddressId(simplified[0]._id);
        localStorage.setItem("addressId", simplified[0]._id);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
    setLoadingAddresses(false);
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/get-profile");
      setProfile(res.data.user);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };


  useEffect(() => {
    fetchProfile();
    fetchAddresses();
  }, []);

  const saveProfile = async () => {
    try {
      await api.put("/auth/update-profile", profile);
    } catch (err) {
      fetchProfile();
      console.error("Error updating profile:", err);
    }
  };

  const handleAddressChange = (id, field, value) => {
    setAddresses(
      addresses.map((a) => (a._id === id ? { ...a, [field]: value } : a))
    );
  };

  const updateAddress = async (updatedAddress) => {
    try {

      const coords = await getCoordsFromAddress(updatedAddress);

      if (coords) {
        updatedAddress.location = { type: "Point", coordinates: coords };

        await api.put(`/user/address/${updatedAddress._id}`, updatedAddress);
      }
      else {
        alert("please after some time");
      }
    }
    catch (err) {
      console.error("Error updating address:", err);
      fetchAddresses();
    }
  };

  const handleAddAddress = async () => {
    if (!newAddress.label || !newAddress.address_line1 || !newAddress.city) {
      alert("Please fill all required fields (Label, Address Line 1, City)");
      return;
    }

    try {

      const coords = await getCoordsFromAddress(newAddress);

      if (coords) {
        newAddress.location = { type: "Point", coordinates: coords };

        console.log("after", newAddress);

        await api.post(`/user/address`, newAddress);
      }
      else {
        alert("please after some time");
      }
    }
    catch (err) {
      console.error("Error adding address:", err);
    }

    fetchAddresses();

    setNewAddress({
      label: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      alternate_phone: "",
    });
    setShowAddForm(false);
    alert("New address added!");
  };



  const handleAddLiveLocation = async () => {
    try {
      setLoadingLocation(true);

      // 1️⃣ Get accurate coordinates
      const pos = await getAccuratePosition();

      // 2️⃣ Reverse-geocode to get address fields
      const liveAddress = await getAddressFromCoords(pos.lat, pos.lon);

      if (!liveAddress) {
        console.warn("Could not fetch address from coordinates");
        return;
      }

      // 3️⃣ Combine with coordinates
      const addressToSave = {
        ...liveAddress,
        location: { type: "Point", coordinates: [pos.lon, pos.lat] },
      };

      // 5️⃣ Submit to backend
      await api.post(`/user/address`, addressToSave);
      alert("Address added successfully!");
    } catch (err) {
      if (err.code === 1) {
        alert("Location permission denied");
        console.warn("Location permission denied");
      }
      else {
        alert("Please try again!");
        console.error("Error fetching location or address:", err)
      };
    } finally {
      fetchAddresses();
      setLoadingLocation(false);
    }
  };


  const handleSetDefault = (id) => {
    setDefaultAddressId(id);
    localStorage.setItem("addressId", id);
    // Optionally: send PUT request to backend
  };


  const {
    pageBg,
    textClass,
    inputBg,
    borderDefault,
    borderActive,
    sectionBg,
    isDark } = useThemeClasses();

  return (
    <div
      className={`flex flex-col p-4 sm:p-6 overflow-y-auto min-h-screen ${pageBg} ${textClass}`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Account
      </h1>

      {/* Update Profile Section */}
      <CollapsibleSection title="Update Profile">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Name"
            value={profile.full_name}
            onChange={(e) =>
              setProfile({ ...profile, full_name: e.target.value })
            }
            className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
          />
          <input
            disabled
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
          />
          <input
            type="text"
            placeholder="Phone"
            value={profile.phone_number}
            onChange={(e) =>
              setProfile({ ...profile, phone_number: e.target.value })
            }
            className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
          />
        </div>
        <motion.button
          whileHover={{ scale: saving ? 1 : 1.05 }}
          whileTap={{ scale: saving ? 1 : 0.95 }}
          onClick={() => {
            setSaving(true);
            saveProfile().finally(() => setSaving(false));
          }}
          disabled={saving}
          className={`mt-4 w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base transition-all shadow-sm border
    ${saving
              ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed opacity-80"
              : "bg-blue-200 hover:bg-blue-300 text-blue-800 border-blue-200"
            }`}
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Profile
            </>
          )}
        </motion.button>


      </CollapsibleSection>

      {/* Addresses Section */}
      <CollapsibleSection title="Addresses">
        {loadingAddresses ? (

          <div className={`p-4 sm:p-5 mb-4 rounded border animate-pulse
          ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"}`}>

            <div className="flex justify-between items-center mb-2">
              <div className={`h-5 w-32 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className={`h-4 w-16 rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex flex-col">
                  <div className={`h-3 w-24 rounded mb-1 ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
                  <div className={`h-8 w-full rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
                </div>
              ))}
            </div>

            <div className={`mt-4 h-10 w-full rounded ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
          </div>

        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 sm:p-5 mb-4 rounded border text-sm sm:text-base transition-all ${defaultAddressId === addr._id ? borderActive : borderDefault
                }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base sm:text-lg">{addr.label}</h3>
                <button
                  className="text-xs sm:text-sm text-blue-500"
                  onClick={() => handleSetDefault(addr._id)}
                >
                  {defaultAddressId === addr._id ? "Default" : "Set Default"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(addr)
                  .filter(
                    (k) =>
                      !["_id", "user", "location", "__v", "createdAt", "updatedAt"].includes(
                        k
                      )
                  )
                  .map((key) => (
                    <div key={key} className="flex flex-col">
                      <label className="text-xs sm:text-sm font-medium mb-1">
                        {addressLabels[key]}
                      </label>
                      <input
                        type="text"
                        value={addr[key]}
                        onChange={(e) =>
                          handleAddressChange(addr._id, key, e.target.value)
                        }
                        className={`p-2 text-sm sm:text-base rounded border w-full ${inputBg}`}
                      />
                    </div>
                  ))}
              </div>

              <motion.button
                whileHover={{ scale: updateId === addr._id ? 1 : 1.05 }}
                whileTap={{ scale: updateId === addr._id ? 1 : 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (updateId === addr._id) return;
                  setUpdateId(addr._id);
                  updateAddress(addr).finally(() => setUpdateId(null));
                }}
                disabled={updateId === addr._id}
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded text-sm sm:text-base bg-yellow-200 hover:bg-yellow-300 text-yellow-800 shadow-sm transition-all
             w-full sm:w-auto self-end"
              >
                {updateId === addr._id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <MapIcon className="w-5 h-5" />
                    Update Address
                  </>
                )}
              </motion.button>
            </div>
          ))
        )}

        {/* Add New Address Button */}
        {!showAddForm && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            {/* Add New Address */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base transition-all shadow-sm border backdrop-blur-sm
            ${isDark
                  ? "bg-green-900/40 hover:bg-green-800/50 text-green-200 border-green-700/40"
                  : "bg-green-100/70 hover:bg-green-200/80 text-green-800 border-green-300/40"
                }`}
            >
              <MapPin className="w-4 h-4" />
              Add New Address
            </motion.button>

            {/* Add Live Location Address */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddLiveLocation}
              disabled={loadingLocation}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base transition-all shadow-sm border backdrop-blur-sm
    ${isDark
                  ? "bg-red-900/40 hover:bg-red-800/50 text-red-200 border-red-700/40"
                  : "bg-red-100/70 hover:bg-red-200/80 text-red-800 border-red-300/40"
                }`}
            >
              {loadingLocation ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <LocateFixed className="w-4 h-4" />
                  Add Live Location
                </>
              )}
            </motion.button>

          </div>

        )}


        {/* Add New Address Form */}
        {showAddForm && (
          <div
            className={`mt-6 p-4 sm:p-6 rounded-lg border ${borderDefault} ${sectionBg} shadow-inner transition-all`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-base sm:text-lg">New Address</h3>
              <button
                className="text-red-500 text-sm sm:text-base"
                onClick={() => setShowAddForm(false)}
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {Object.keys(newAddress).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-xs sm:text-sm font-medium mb-1">
                    {addressLabels[key]}
                  </label>
                  <input
                    type="text"
                    placeholder={addressLabels[key]}
                    value={newAddress[key]}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, [key]: e.target.value })
                    }
                    className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              {/* Save Address Button */}
              <motion.button
                whileHover={{ scale: savingAddress ? 1 : 1.05 }}
                whileTap={{ scale: savingAddress ? 1 : 0.95 }}
                onClick={() => {
                  setSavingAddress(true)
                  handleAddAddress().finally(() => setSavingAddress(false));
                }}
                disabled={savingAddress}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base transition-all shadow-sm border backdrop-blur-sm
    ${savingAddress
                    ? isDark
                      ? "bg-blue-900/50 text-blue-300 border-blue-700/50 cursor-not-allowed opacity-80"
                      : "bg-blue-100/50 text-blue-500 border-blue-300/50 cursor-not-allowed opacity-80"
                    : isDark
                      ? "bg-blue-900/40 hover:bg-blue-800/50 text-blue-200 border-blue-700/40"
                      : "bg-blue-100/70 hover:bg-blue-200/80 text-blue-800 border-blue-300/40"
                  }`}
              >
                {savingAddress ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveAll className="w-4 h-4" />
                    Save Address
                  </>
                )}
              </motion.button>


              {/* Cancel Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(false)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm sm:text-base transition-all shadow-sm border backdrop-blur-sm
      ${isDark
                    ? "bg-gray-700/40 hover:bg-gray-600/50 text-gray-200 border-gray-600/40"
                    : "bg-gray-100/70 hover:bg-gray-200/80 text-gray-800 border-gray-300/40"
                  }`}
              >
                <X className="w-4 h-4" />
                Cancel
              </motion.button>
            </div>

          </div>
        )}
      </CollapsibleSection>
    </div>
  );
};

export default UserProfile;
