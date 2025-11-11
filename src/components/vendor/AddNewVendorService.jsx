import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { useOutletContext } from "react-router-dom";



const ServiceSkeleton = ({ cardDefault }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`p-3 border rounded-xl min-w-[200px] sm:min-w-[250px] flex-shrink-0 relative overflow-hidden ${cardDefault}`}
        >
          {/* Shimmer Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-600/20 animate-[shimmer_1.8s_infinite]" />
          <div className="h-4 w-32 bg-gray-300/40 dark:bg-gray-600/40 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-300/40 dark:bg-gray-600/40 rounded" />
        </div>
      ))}
    </div>
  );
};



const AddNewVendorService = () => {

  const { search } = useOutletContext();

  const [availableServices, setAvailableServices] = useState([]);

  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [notes, setNotes] = useState("");
  const [addons, setAddons] = useState([]);
  const [description, setDescription] = useState("");


  const [loading, setLoading] = useState(false);

  const fetchAvailableServicers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/service/");
      setAvailableServices(res.data);
    } catch (err) {
      console.error("Error fetching available services:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAvailableServicers();
  }, [])



  const filteredAvailableServices = availableServices?.filter(service => {
    const searchTerm = search.toLowerCase();

    const inName = service.service_name?.toLowerCase().includes(searchTerm);
    const inType = service.pricing_type?.toLowerCase().includes(searchTerm);
    const inPrice = service.base_price?.toString().includes(searchTerm);
    const inId = service.service_id?.toLowerCase().includes(searchTerm);

    return inName || inType || inPrice || inId;
  });



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

  const handleSave = async () => {
    if (!selectedServiceId) return alert("Select a service!");

    setLoading(true);

    const payload = {
      service: selectedService,
      price,
      discount,
      final_price: finalPrice,
      notes,
      addons,
    };


    try {
      await api.post(`/service/vendor/${selectedServiceId}`, payload);

      fetchAvailableServicers();

      alert("Service added successfully!");
    } catch (err) {
      console.error("❌ Error adding service:", err);
      alert("Failed to add new  service. Please try again.");
    }

    setLoading(false);

  };




  const { bgClass, inputBg, cardDefault, cardSelected, pageBg, textClass, cardBgActive } =
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


        {loading ? (
          <ServiceSkeleton cardDefault={cardDefault} />
        ) : (
          <div className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {filteredAvailableServices.map((service) => {
              const selected = selectedServiceId === service.service_id;
              return (
                <div
                  key={service.service_id}
                  className={`p-3 border rounded-xl w-[80%] xs:w-[70%] sm:w-[250px] flex-shrink-0 snap-start cursor-pointer transition 
                    ${selected ? cardBgActive : cardDefault}`}
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
        )}


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
                {loading ? "Saving..." : (<><Save className="w-4 h-4" /> Save</>)}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AddNewVendorService;
