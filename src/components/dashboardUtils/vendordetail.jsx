import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    description: "",
    address: "",
    aadhar_card: null,
    pan_card: null,
    business_document: null,
    selectedServiceId: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("vendorData"));
    if (savedData) setFormData(savedData);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("vendorData", JSON.stringify(formData));
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    const savedData = JSON.parse(localStorage.getItem("vendorData"));
    setFormData(savedData || {});
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex justify-center items-start p-6 overflow-y-auto">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl my-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-purple-700">Vendor Profile</h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Edit
            </button>
          ) : (
            <div className="space-x-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vendor Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vendor Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-gray-800">{formData.name || "N/A"}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-gray-800">{formData.email || "N/A"}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-gray-800">{formData.phone_number || "N/A"}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-gray-800">{formData.address || "N/A"}</p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-gray-800">{formData.description || "N/A"}</p>
            )}
          </div>

          {/* Selected Service */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Selected Service
            </label>
            {isEditing ? (
              <input
                type="text"
                name="selectedServiceId"
                value={formData.selectedServiceId || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-gray-800">
                {formData.selectedServiceId || "N/A"}
              </p>
            )}
          </div>
        </div>

        {/* Uploaded Documents Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Uploaded Documents
          </h3>

          <div className="space-y-4">
            {/* Aadhar Card */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Aadhar Card
              </label>
              {isEditing ? (
                <input
                  type="file"
                  name="aadhar_card"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white cursor-pointer 
                             file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                             file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              ) : (
                <p className="text-gray-800">
                  {formData.aadhar_card
                    ? formData.aadhar_card.name || "Uploaded"
                    : "Not uploaded"}
                </p>
              )}
            </div>

            {/* PAN Card */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                PAN Card
              </label>
              {isEditing ? (
                <input
                  type="file"
                  name="pan_card"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white cursor-pointer 
                             file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                             file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              ) : (
                <p className="text-gray-800">
                  {formData.pan_card
                    ? formData.pan_card.name || "Uploaded"
                    : "Not uploaded"}
                </p>
              )}
            </div>

            {/* Business Document */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Business Document
              </label>
              {isEditing ? (
                <input
                  type="file"
                  name="business_document"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white cursor-pointer 
                             file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                             file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                />
              ) : (
                <p className="text-gray-800">
                  {formData.business_document
                    ? formData.business_document.name || "Uploaded"
                    : "Not uploaded"}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
