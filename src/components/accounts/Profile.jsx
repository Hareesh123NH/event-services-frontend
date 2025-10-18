// ProfilePage.js
import React, { useState, useEffect } from "react";

// Initial addresses (simulated backend)
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

// Collapsible Section Component
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
      <button
        className="w-full px-6 py-3 text-left font-semibold text-lg border-b border-gray-200 dark:border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <div className="p-6">{children}</div>}
    </div>
  );
};

const ProfilePage = () => {
  // Load from localStorage if exists
  const savedProfile = JSON.parse(localStorage.getItem("profile")) || {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543210",
  };
  const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || initialAddresses;
  const savedDefaultId = localStorage.getItem("defaultAddressId") || savedAddresses[0]._id;

  const [profile, setProfile] = useState(savedProfile);
  const [addresses, setAddresses] = useState(savedAddresses);
  const [defaultAddressId, setDefaultAddressId] = useState(savedDefaultId);
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

  // Save profile to localStorage
  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile updated successfully!");
  };

  // Update existing address
  const handleAddressChange = (id, field, value) => {
    setAddresses(addresses.map(a => (a._id === id ? { ...a, [field]: value } : a)));
  };

  // Save updated address
  const updateAddress = (addr) => {
    setAddresses(addresses.map(a => (a._id === addr._id ? addr : a)));
    localStorage.setItem("addresses", JSON.stringify(addresses));
    alert("Address updated successfully!");
  };

  // Add new address
  const handleAddAddress = () => {
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
    alert("New address added!");
  };

  // Set default address
  const handleSetDefault = (id) => {
    setDefaultAddressId(id);
    localStorage.setItem("defaultAddressId", id);
  };

  return (
    <div className="flex flex-col p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Account</h1>

      {/* Update Profile Section */}
      <CollapsibleSection title="Update Profile">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={profile.name}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={profile.phone}
            onChange={e => setProfile({ ...profile, phone: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </CollapsibleSection>

      {/* Addresses Section */}
      <CollapsibleSection title="Addresses">
        {addresses.map(addr => (
          <div
            key={addr._id}
            className={`p-4 mb-4 border rounded ${
              defaultAddressId === addr._id ? "border-blue-500" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{addr.label}</h3>
              <button
                className="text-sm text-blue-600"
                onClick={() => handleSetDefault(addr._id)}
              >
                {defaultAddressId === addr._id ? "Default" : "Set Default"}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.keys(addr)
                .filter(k => k !== "_id")
                .map(key => (
                  <input
                    key={key}
                    type="text"
                    value={addr[key]}
                    onChange={e => handleAddressChange(addr._id, key, e.target.value)}
                    className="p-2 border rounded"
                  />
                ))}
            </div>
            <button
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => updateAddress(addr)}
            >
              Update Address
            </button>
          </div>
        ))}

        {/* Add New Address */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Add New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(newAddress).map(key => (
              <input
                key={key}
                type="text"
                placeholder={key.replace("_", " ").toUpperCase()}
                value={newAddress[key]}
                onChange={e => setNewAddress({ ...newAddress, [key]: e.target.value })}
                className="p-2 border rounded"
              />
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default ProfilePage;
