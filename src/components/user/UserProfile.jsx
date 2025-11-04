import React, { useState } from "react";
import { useThemeClasses } from "../theme/themeClasses";

const initialAddresses = [
  {
    _id: "68eddb778149a6a4f702e6f0",
    label: "Home",
    address_line1: "123 MG Road",
    address_line2: "Near City Mall",
    city: "Hyderabad",
    state: "Telangana",
    postal_code: "560001",
    country: "India",
    alternate_phone: "+91-9876543210",
  },
  {
    _id: "68d7a24ebdc024c7b9cdce1a",
    label: "Work",
    address_line1: "123 MG Road",
    address_line2: "Near City Mall",
    city: "Bengaluru",
    state: "Karnataka",
    postal_code: "560001",
    country: "India",
    alternate_phone: "+91-9876543210",
  },
];

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
  const savedProfile = JSON.parse(localStorage.getItem("profile")) || {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543210",
  };
  const savedAddresses =
    JSON.parse(localStorage.getItem("addresses")) || initialAddresses;
  const savedDefaultId =
    localStorage.getItem("defaultAddressId") || savedAddresses[0]._id;

  const [profile, setProfile] = useState(savedProfile);
  const [addresses, setAddresses] = useState(savedAddresses);
  const [defaultAddressId, setDefaultAddressId] = useState(savedDefaultId);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    alternate_phone: "",
  });

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  const handleAddressChange = (id, field, value) => {
    setAddresses(addresses.map((a) => (a._id === id ? { ...a, [field]: value } : a)));
  };

  const updateAddress = (addr) => {
    setAddresses(addresses.map((a) => (a._id === addr._id ? addr : a)));
    localStorage.setItem("addresses", JSON.stringify(addresses));
    alert("Address updated successfully!");
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address_line1 || !newAddress.city) {
      alert("Please fill all required fields (Label, Address Line 1, City)");
      return;
    }

    const id = Date.now().toString();
    const updated = [...addresses, { ...newAddress, _id: id }];
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
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

  const handleSetDefault = (id) => {
    setDefaultAddressId(id);
    localStorage.setItem("defaultAddressId", id);
  };

  const {
    pageBg,
    textClass,
    inputBg,
    buttonPrimary,
    buttonSecondary,
    borderDefault,
    borderActive,
    sectionBg,
  } = useThemeClasses();

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
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
          />
          <input
            type="text"
            placeholder="Phone"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
          />
        </div>
        <button
          className={`mt-4 px-4 py-2 w-full sm:w-auto text-sm sm:text-base rounded ${buttonPrimary}`}
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </CollapsibleSection>

      {/* Addresses Section */}
      <CollapsibleSection title="Addresses">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className={`p-4 sm:p-5 mb-4 rounded border text-sm sm:text-base transition-all ${
              defaultAddressId === addr._id ? borderActive : borderDefault
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
                .filter((k) => k !== "_id")
                .map((key) => (
                  <input
                    key={key}
                    type="text"
                    value={addr[key]}
                    onChange={(e) => handleAddressChange(addr._id, key, e.target.value)}
                    className={`p-2 text-sm sm:text-base rounded border w-full ${inputBg}`}
                  />
                ))}
            </div>
            <button
              className={`mt-3 px-4 py-2 w-full sm:w-auto text-sm sm:text-base rounded ${buttonSecondary}`}
              onClick={() => updateAddress(addr)}
            >
              Update Address
            </button>
          </div>
        ))}

        {/* Add New Address Button */}
        {!showAddForm && (
          <button
            className={`mt-4 px-4 py-2 w-full sm:w-auto rounded ${buttonPrimary}`}
            onClick={() => setShowAddForm(true)}
          >
            + Add New Address
          </button>
        )}

        {/* Add New Address Form (visible only when clicked) */}
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
                <input
                  key={key}
                  type="text"
                  placeholder={key.replace("_", " ").toUpperCase()}
                  value={newAddress[key]}
                  onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
                  className={`p-2 sm:p-3 text-sm sm:text-base rounded border w-full ${inputBg}`}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <button
                className={`w-full sm:w-auto px-4 py-2 rounded ${buttonPrimary}`}
                onClick={handleAddAddress}
              >
                Save Address
              </button>
              <button
                className={`w-full sm:w-auto px-4 py-2 rounded ${buttonSecondary}`}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </CollapsibleSection>
    </div>
  );
};

export default UserProfile;
