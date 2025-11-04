import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";

const availableServices = [
  {
    service_id: "68d7a008bdc024c7b9cdce0d",
    service_name: "Photography",
    description: "Provide the photoshoots, wedding albums",
    base_price: 800,
    pricing_type: "per_day",
  },
  {
    service_id: "68d7a09ebdc024c7b9cdce10",
    service_name: "Catering",
    description: "Delicious food for weddings, parties, and events",
    base_price: 1500,
    pricing_type: "per_day",
  },
  {
    service_id: "68d7a0adbdc024c7b9cdce13",
    service_name: "Decoration",
    description: "Beautiful event decoration including flowers, lighting, and stage setup",
    base_price: 2000,
    pricing_type: "per_day",
  },
];

const AddNewVendorService = ({ onSave }) => {
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const [addons, setAddons] = useState([]);
  const [description, setDescription] = useState("");

  const selectedService = availableServices.find(
    (s) => s.service_id === selectedServiceId
  );

  useEffect(() => {
    if (price && discount >= 0) {
      const final = price - (price * discount) / 100;
      setFinalPrice(final);
    } else {
      setFinalPrice(0);
    }
  }, [price, discount]);

  const handleAddonChange = (index, field, value) => {
    const newAddons = [...addons];
    newAddons[index][field] = value;
    setAddons(newAddons);
  };

  const handleAddAddon = () =>
    setAddons([...addons, { title: "", price: "", description: "" }]);
  const handleRemoveAddon = (index) =>
    setAddons(addons.filter((_, i) => i !== index));

  const handleSave = () => {
    if (!selectedServiceId) return alert("Select a service!");
    const payload = {
      service: selectedService,
      price,
      discount,
      final_price: finalPrice,
      notes,
      addons,
    };
    console.log("New Vendor Service:", payload);
    onSave && onSave(payload);
  };

  const { bgClass, inputBg, cardDefault, cardSelected, pageBg, textClass } =
    useThemeClasses();

  return (
    <div className={`min-h-[90vh] overflow-y-auto p-4 md:p-6 ${bgClass} ${textClass}`}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`shadow-md rounded-2xl border p-4 sm:p-6 flex flex-col gap-4 ${pageBg}`}
      >
        <h2 className="text-lg font-semibold mb-2 text-center md:text-left">
          Add New Vendor Service
        </h2>

        {/* Select Service */}
        <h3 className="text-base md:text-xl font-semibold mb-2">
          Select Service
        </h3>

        {/* Scrollable Services */}
        <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {availableServices.map((service) => {
            const selected = selectedServiceId === service.service_id;
            return (
              <div
                key={service.service_id}
                className={`p-3 border rounded-xl min-w-[200px] sm:min-w-[250px] flex-shrink-0 cursor-pointer transition 
                ${selected ? cardSelected : cardDefault}`}
                onClick={() => {
                  setSelectedServiceId(service.service_id);
                  setPrice(service.base_price);
                  setDiscount(0);
                  setNotes("");
                  setAddons([]);
                  setDescription(service.description);
                }}
              >
                <p className="font-semibold text-sm sm:text-base">{service.service_name}</p>
                <p className="text-xs sm:text-sm">
                  Base Price: ₹{service.base_price}/{service.pricing_type}
                </p>
              </div>
            );
          })}
        </div>

        {selectedService && (
          <>
            {/* Description */}
            <div className="mb-3">
              <label className="font-medium text-sm">Description</label>
              <p className="text-xs sm:text-sm mt-1">{description}</p>
            </div>

            {/* Price Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className={`w-full mt-1 p-2 rounded-md border text-sm ${inputBg}`}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Discount (%)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) =>
                    setDiscount(parseFloat(e.target.value) || 0)
                  }
                  className={`w-full mt-1 p-2 rounded-md border text-sm ${inputBg}`}
                />
              </div>
            </div>

            {/* Final Price */}
            <div>
              <label className="text-sm font-medium">Final Price (₹)</label>
              <input
                type="number"
                value={finalPrice}
                disabled
                className={`w-full mt-1 p-2 rounded-md border text-gray-500 text-sm ${inputBg}`}
              />
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes..."
                className={`w-full mt-1 p-2 rounded-md border text-sm ${inputBg}`}
              />
            </div>

            {/* Add-ons Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Add-ons</label>
                <button
                  onClick={handleAddAddon}
                  className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>

              {addons.length === 0 && (
                <p className="text-gray-500 text-xs sm:text-sm">
                  No add-ons yet.
                </p>
              )}

              {addons.map((addon, index) => (
                <div
                  key={index}
                  className={`p-3 mb-3 border rounded-lg ${inputBg}`}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold text-sm">
                      Add-on {index + 1}
                    </h4>
                    <button
                      onClick={() => handleRemoveAddon(index)}
                      className="text-red-500 hover:text-red-700 text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Title"
                    value={addon.title}
                    onChange={(e) =>
                      handleAddonChange(index, "title", e.target.value)
                    }
                    className={`w-full mb-2 p-2 rounded-md border text-sm ${inputBg}`}
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={addon.price}
                    onChange={(e) =>
                      handleAddonChange(
                        index,
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className={`w-full mb-2 p-2 rounded-md border text-sm ${inputBg}`}
                  />

                  <textarea
                    placeholder="Description"
                    value={addon.description}
                    onChange={(e) =>
                      handleAddonChange(index, "description", e.target.value)
                    }
                    rows={2}
                    className={`w-full p-2 rounded-md border text-sm ${inputBg}`}
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end sticky bottom-0 pt-2 pb-3 bg-opacity-90">
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AddNewVendorService;
