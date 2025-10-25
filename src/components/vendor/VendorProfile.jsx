import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, MapPin, Save, Edit2, X } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";

const VendorProfile = () => {

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone_number: "+91 9876543210",
    address: "Hyderabad, Telangana",
    description: "We provide catering and decoration services for all events.",
    profileImage:
      "https://img.favpng.com/14/4/9/smiling-business-man-smiling-3d-businessman-character-in-suit-QPGuRB56_t.jpg",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };


  const { imgBg, pageBg, cardBg, textPrimary, textSecondary, inputBg, inputDisabledBg, borderEditing, } = useThemeClasses();
  return (
    <div className={`flex-1 overflow-y-auto px-6 py-6 md:px-10 ${pageBg} ${textPrimary}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-3xl mx-auto ${cardBg} rounded-2xl shadow-lg p-6 md:p-8 relative`}
      >
        {/* Edit Icon */}
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="absolute top-4 right-4 text-gray-500 hover:text-blue-600 transition"
            title="Edit Profile"
          >
            <Edit2 size={20} />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={formData.profileImage}
              alt="Profile"
              className={`w-24 h-24 rounded-full object-cover border-4 ${imgBg}`}
            />
            {editing && (
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                <Camera size={16} />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{formData.name}</h1>
            <p className={textSecondary}>{formData.email}</p>
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className={`block text-sm mb-1 ${textSecondary}`}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 rounded-md border ${editing ? borderEditing : inputBg}`}
            />
          </div>

          {/* Email */}
          <div>
            <label className={`flex items-center gap-2 text-sm ${textSecondary}`}>
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className={`w-full p-2 mt-1 rounded-md border ${inputDisabledBg}`}
            />
          </div>

          {/* Phone */}
          <div>
            <label className={`flex items-center gap-2 text-sm ${textSecondary}`}>
              <Phone size={16} /> Phone
            </label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 mt-1 rounded-md border ${editing ? borderEditing : inputBg}`}
            />
          </div>

          {/* Address */}
          <div>
            <label className={`flex items-center gap-2 text-sm ${textSecondary}`}>
              <MapPin size={16} /> Address
            </label>
            <textarea
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 mt-1 rounded-md border ${editing ? borderEditing : inputBg}`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm mb-1 ${textSecondary}`}>Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 mt-1 rounded-md border ${editing ? borderEditing : inputBg}`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {editing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg flex items-center gap-2 transition"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition"
              >
                <Save size={16} /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition"
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
