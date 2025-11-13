import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, MapPin, Save, Edit2, X } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { getCoordsFromAddressHelper } from "../user/location";

const profileImage =
  "https://img.favpng.com/14/4/9/smiling-business-man-smiling-3d-businessman-character-in-suit-QPGuRB56_t.jpg";

const VendorProfile = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    description: "",
    // profileImage: "",
  });

  const [saving, setSaving] = useState(false);

  // ✅ Fetch vendor profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/get-profile");
      setFormData(res.data.user);
    } catch (err) {
      console.error("Error fetching vendor profile:", err);
    }
  };

  // ✅ Update vendor profile
  const handleSave = async () => {
    
    const nameRegex = /^[A-Za-z][A-Za-z0-9\s]{2,}$/;
    if (!nameRegex.test(formData.full_name)) {
      alert(
        "Please enter a valid full name (letters and spaces only, at least 3 characters)."
      );
      return;
    }

    // Phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone_number)) {
      alert(
        "Please enter a valid 10-digit Indian phone number starting with 6-9."
      );
      return;
    }

    setSaving(true);

    try {
      const updateData = {
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        address: formData.address,
        description: formData.description,
      };

      const coords = await getCoordsFromAddressHelper(updateData.address);

      if (coords) {
        updateData.location = { type: "Point", coordinates: coords };

        console.log("after", updateData);

        await api.put("/auth/update-profile", updateData);
        fetchProfile();
        alert("Profile updated successfully!");
      } else {
        alert("please try after some time");
      }
    } catch (err) {
      console.error("Error updating vendor profile:", err);
      alert("Failed to update profile");
    }
    setSaving(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleCancel = () => {
    fetchProfile();
    setEditing(false);
  };

  const {
    imgBg,
    pageBg,
    cardBg,
    textPrimary,
    textSecondary,
    inputBg,
    inputDisabledBg,
    borderEditing,
  } = useThemeClasses();

  return (
    <div
      className={`flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 ${pageBg} ${textPrimary}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-3xl mx-auto ${cardBg} rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-8 relative`}
      >
        {/* Edit Icon */}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-blue-600 transition"
            title="Edit Profile"
          >
            <Edit2 size={20} />
          </button>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 ${imgBg}`}
            />
            {editing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                <Camera size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {formData.full_name}
            </h1>
            <p className={`${textSecondary} text-sm sm:text-base`}>
              {formData.email}
            </p>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label className={`block text-sm mb-1 ${textSecondary}`}>
              Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 sm:p-2.5 rounded-md border text-sm sm:text-base ${
                editing ? borderEditing : inputBg
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label
              className={`flex items-center gap-2 text-sm ${textSecondary}`}
            >
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className={`w-full p-2 mt-1 rounded-md border text-sm sm:text-base ${inputDisabledBg}`}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className={`flex items-center gap-2 text-sm ${textSecondary}`}
            >
              <Phone size={16} /> Phone
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 mt-1 rounded-md border text-sm sm:text-base ${
                editing ? borderEditing : inputBg
              }`}
            />
          </div>

          {/* Address */}
          <div>
            <label
              className={`flex items-center gap-2 text-sm ${textSecondary}`}
            >
              <MapPin size={16} /> Address
            </label>
            <textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 mt-1 rounded-md border text-sm sm:text-base ${
                editing ? borderEditing : inputBg
              }`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm mb-1 ${textSecondary}`}>
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 mt-1 rounded-md border text-sm sm:text-base ${
                editing ? borderEditing : inputBg
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          {editing ? (
            <>
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center justify-center gap-2 transition text-sm sm:text-base"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition text-sm sm:text-base"
              >
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save size={16} /> Save
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VendorProfile;
