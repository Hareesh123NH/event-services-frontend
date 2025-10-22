import { Star, CalendarCheck, Tag, Save, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VendorServiceBlock = ({ serviceItem, index, theme = "light" }) => {
  const [data, setData] = useState({
    price: serviceItem.price || "",
    base_price: serviceItem.service.base_price || "",
    discount: serviceItem.discount || "",
    status: serviceItem.status || "active",
    addons: serviceItem.addons || [],
    notes: serviceItem.notes || "",
  });

  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    if (data.price && data.discount >= 0) {
      const final = data.price - (data.price * data.discount) / 100;
      setFinalPrice(final);
    } else {
      setFinalPrice(0);
    }
  }, [data.price, data.discount]);

  const handleChange = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const handleAddonChange = (index, field, value) => {
    const newAddons = [...data.addons];
    newAddons[index][field] = value;
    setData((prev) => ({ ...prev, addons: newAddons }));
  };

  const handleAddAddon = () => {
    setData((prev) => ({
      ...prev,
      addons: [...prev.addons, { title: "", price: "", description: "" }],
    }));
  };

  const handleRemoveAddon = (index) => {
    setData((prev) => ({
      ...prev,
      addons: prev.addons.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const payload = { ...data, final_price: finalPrice };
    console.log("Updated Service:", payload);
    alert("Updated Service success!");
  };

  // Theme-aware classes
  const bgClass = theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900";
  const inputBg = theme === "dark" ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-gray-50 border-gray-300 text-gray-900";
  const addonBg = theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`shadow-md rounded-2xl border p-6 ${bgClass} ${theme === "dark" ? "border-gray-700" : "border-gray-100"}`}
    >
      {/* Header Section */}
      <h2 className="text-xl font-semibold mb-2">{serviceItem.service.service_name}</h2>

      <div className="text-sm mb-2 flex flex-col gap-1">
        <span>
          <strong>Base Price:</strong> ₹{data.base_price || 0}
        </span>
        <span>
          <strong>Final Price:</strong> ₹{finalPrice.toFixed(2)}{" "}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({serviceItem.service.pricing_type})
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
        <span className="flex items-center text-gray-600 dark:text-gray-400">
          <Tag className="w-4 h-4 mr-1 text-gray-500" /> {serviceItem.discount}% off
        </span>
        <span className="flex items-center text-gray-600 dark:text-gray-400">
          <Star className="w-4 h-4 mr-1 text-yellow-500" /> {serviceItem.average_rating} / 5
        </span>
        <span className="flex items-center text-gray-600 dark:text-gray-400">
          <CalendarCheck className="w-4 h-4 mr-1 text-green-500" /> {serviceItem.total_bookings} bookings
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${serviceItem.status === "active"
            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
            : "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100"
            }`}
        >
          {serviceItem.status}
        </span>
      </div>

      {/* Editable Details */}
      <div className="border-t pt-4 mt-3 border-gray-200 dark:border-gray-700">
        {/* Price */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Price (₹)</label>
          <input
            type="number"
            value={data.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
            className={`w-full mt-1 p-2 rounded-md border ${inputBg}`}
          />
        </div>

        {/* Discount */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Discount (%)</label>
          <input
            type="number"
            value={data.discount}
            onChange={(e) => handleChange("discount", parseFloat(e.target.value) || 0)}
            className={`w-full mt-1 p-2 rounded-md border ${inputBg}`}
          />
        </div>

        {/* Final Price */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Final Price (₹)</label>
          <input
            type="number"
            value={finalPrice}
            disabled
            className={`w-full mt-1 p-2 rounded-md border ${inputBg} text-gray-600`}
          />
        </div>

        {/* Add-ons Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold">Add-ons</label>
            <button
              onClick={handleAddAddon}
              className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          {data.addons.length === 0 && <p className="text-gray-500 text-sm">No add-ons yet.</p>}

          {data.addons.map((addon, index) => (
            <div key={index} className={`p-3 mb-3 rounded-lg border ${addonBg}`}>
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-sm">Add-on {index + 1}</h4>
                <button
                  onClick={() => handleRemoveAddon(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium"
                >
                  Remove
                </button>
              </div>

              {/* Title */}
              <input
                type="text"
                placeholder="Title"
                value={addon.title}
                onChange={(e) => handleAddonChange(index, "title", e.target.value)}
                className={`w-full mb-2 p-2 rounded-md border ${inputBg}`}
              />

              {/* Price */}
              <input
                type="number"
                placeholder="Price"
                value={addon.price}
                onChange={(e) => handleAddonChange(index, "price", parseFloat(e.target.value) || 0)}
                className={`w-full mb-2 p-2 rounded-md border ${inputBg}`}
              />

              {/* Description */}
              <textarea
                placeholder="Description"
                value={addon.description}
                onChange={(e) => handleAddonChange(index, "description", e.target.value)}
                rows={2}
                className={`w-full p-2 rounded-md border ${inputBg}`}
              />
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="text-sm font-semibold">Notes</label>
          <textarea
            value={data.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className={`w-full mt-1 p-2 rounded-md border ${inputBg}`}
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-sm font-semibold">Status</label>
          <select
            value={data.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className={`w-full mt-1 p-2 rounded-md border ${inputBg}`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorServiceBlock;
