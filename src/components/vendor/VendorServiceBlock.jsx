import { Star, CalendarCheck, Tag, Save, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";

const VendorServiceBlock = ({ serviceItem, index, onUpdate }) => {
  const [data, setData] = useState({
    price: serviceItem.price || "",
    base_price: serviceItem.service.base_price || "",
    discount: serviceItem.discount || "",
    status: serviceItem.status || "active",
    addons: serviceItem.addons || [],
    notes: serviceItem.notes || "",
  });

  const [finalPrice, setFinalPrice] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data.price && data.discount >= 0) {
      const final = data.price - (data.price * data.discount) / 100;
      setFinalPrice(final);
    } else {
      setFinalPrice(0);
    }
  }, [data.price, data.discount]);

  const handleChange = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

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

  const handleSave = async () => {
    const payload = {
      price: data.price,
      discount: data.discount,
      final_price: finalPrice,
      status: data.status,
      notes: data.notes,
      addons: data.addons,
    };

    setSaving(true);

    try {
      const res = await api.patch(
        `/service/vendor-service/${serviceItem.service._id}`,
        payload
      );
      onUpdate && onUpdate();
      alert("Service updated successfully!");
    } catch (err) {
      console.error("❌ Error updating service:", err);
      onUpdate && onUpdate();
      alert(
        err?.response?.data?.message ||
          "Failed to update service. Please try again."
      );
    }

    setSaving(false);
  };

  const {
    bgCard,
    bgPage,
    textPrimary,
    textSecondary,
    borderColor,
    inputBg,
    inputText,
    buttonText,
    greenButton,
    redButton,
  } = useThemeClasses();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`shadow-md rounded-2xl border ${borderColor} p-4 sm:p-6 ${bgCard} ${textPrimary}`}
    >
      {/* Header Section */}
      <h2 className={`text-lg sm:text-xl font-semibold mb-2 ${textPrimary}`}>
        {serviceItem.service.service_name}
      </h2>

      <div
        className={`text-xs sm:text-sm mb-3 flex flex-col gap-1 ${textSecondary}`}
      >
        <span>
          <strong>Base Price:</strong> ₹{data.base_price || 0}
        </span>
        <span>
          <strong>Final Price:</strong> ₹{finalPrice.toFixed(2)}{" "}
          <span className="text-xs text-gray-500">
            ({serviceItem.service.pricing_type})
          </span>
        </span>
      </div>

      <div
        className={`flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-4 ${textSecondary}`}
      >
        <span className="flex items-center">
          <Tag className="w-4 h-4 mr-1 text-gray-500" /> {data.discount}% off
        </span>
        <span className="flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-500" />{" "}
          {serviceItem.average_rating} / 5
        </span>
        <span className="flex items-center">
          <CalendarCheck className="w-4 h-4 mr-1 text-green-500" />{" "}
          {serviceItem.total_bookings} bookings
        </span>
        <span
          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
            serviceItem.status === "active"
              ? `bg-green-100 text-green-700`
              : `bg-red-100 text-red-700`
          }`}
        >
          {serviceItem.status}
        </span>
      </div>

      {/* Editable Details */}
      <div className={`border-t pt-4 mt-3 ${borderColor}`}>
        {/* Price */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Price (₹)</label>
          <input
            type="number"
            value={data.price}
            onChange={(e) =>
              handleChange("price", parseFloat(e.target.value) || 0)
            }
            className={`w-full mt-1 p-2 rounded-md border ${borderColor} ${inputBg} ${inputText} text-sm sm:text-base`}
          />
        </div>

        {/* Discount */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Discount (%)</label>
          <input
            type="number"
            value={data.discount || 0}
            onChange={(e) =>
              handleChange("discount", parseFloat(e.target.value) || 0)
            }
            className={`w-full mt-1 p-2 rounded-md border ${borderColor} ${inputBg} ${inputText} text-sm sm:text-base`}
          />
        </div>

        {/* Final Price */}
        <div className="mb-3">
          <label className="text-sm font-semibold">Final Price (₹)</label>
          <input
            type="number"
            value={finalPrice}
            disabled
            className={`w-full mt-1 p-2 rounded-md border ${borderColor} ${bgPage} ${textSecondary} text-sm sm:text-base`}
          />
        </div>

        {/* Add-ons Section */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
            <label className="text-sm font-semibold">Add-ons</label>
            <button
              onClick={handleAddAddon}
              className={`text-sm flex items-center gap-1 self-start sm:self-auto hover:underline ${buttonText}`}
            >
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          {data.addons.length === 0 && (
            <p className="text-gray-500 text-sm">No add-ons yet.</p>
          )}

          {data.addons.map((addon, index) => (
            <div
              key={index}
              className={`p-3 mb-3 border ${borderColor} rounded-lg ${inputBg}`}
            >
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
              <div className="mb-2">
                <label
                  className={`block text-xs font-medium mb-1 ${textSecondary}`}
                >
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={addon.title}
                  onChange={(e) =>
                    handleAddonChange(index, "title", e.target.value)
                  }
                  className={`w-full p-2 rounded-md border ${borderColor} ${bgCard} ${inputText}`}
                />
              </div>

              {/* Price */}
              <div className="mb-2">
                <label
                  className={`block text-xs font-medium mb-1 ${textSecondary}`}
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={addon.price}
                  onChange={(e) =>
                    handleAddonChange(
                      index,
                      "price",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className={`w-full p-2 rounded-md border ${borderColor} ${bgCard} ${inputText}`}
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className={`block text-xs font-medium mb-1 ${textSecondary}`}
                >
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  value={addon.description}
                  onChange={(e) =>
                    handleAddonChange(index, "description", e.target.value)
                  }
                  rows={2}
                  className={`w-full p-2 rounded-md border ${borderColor} ${bgCard} ${inputText}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="text-sm font-semibold">Notes</label>
          <textarea
            value={data.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className={`w-full mt-1 p-2 rounded-md border ${borderColor} ${inputBg} ${inputText} text-sm sm:text-base`}
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="text-sm font-semibold">Status</label>
          <select
            value={data.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className={`w-full mt-1 p-2 rounded-md border ${borderColor} ${inputBg} ${inputText} text-sm sm:text-base`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm sm:text-base rounded-lg hover:bg-green-700 transition"
          >
            {saving ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4" /> Save
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorServiceBlock;
