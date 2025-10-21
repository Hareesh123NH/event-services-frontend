import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";

const availableServices = [
    {
        service_id: "68d7a008bdc024c7b9cdce0d",
        service_name: "Photography",
        description: "Provide the photoshoots,wedding albums",
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

    const selectedService = availableServices.find(s => s.service_id === selectedServiceId);

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

    const handleAddAddon = () => {
        setAddons([...addons, { title: "", price: "", description: "" }]);
    };

    const handleRemoveAddon = (index) => {
        setAddons(addons.filter((_, i) => i !== index));
    };

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

    return (
        <div className="h-[90vh] overflow-y-auto p-6">
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-md rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex flex-col gap-4"
            >
                <h2 className="text-lg font-semibold">Add New Vendor Service</h2>

                {/* Select Service */}
                <h3 className="text-xl font-semibold mb-2">Select Service</h3>
                <div className="flex space-x-4 overflow-x-auto mb-4">
                    {availableServices.map((service) => (
                        <div
                            key={service.service_id}
                            className={`p-3 border rounded-lg min-w-[250px] flex-shrink-0 cursor-pointer transition ${selectedServiceId === service.service_id
                                ? "border-blue-500 bg-blue-100 dark:bg-blue-800 dark:border-blue-400"
                                : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                }`}
                            onClick={() => {
                                setSelectedServiceId(service.service_id);
                                setPrice(service.base_price);
                                setDiscount(0);
                                setNotes("");
                                setAddons([]);
                                setDescription(service.description);
                            }}
                        >
                            <p className="font-semibold">{service.service_name}</p>
                            <p>Base Price : ₹{service.base_price}/{service.pricing_type}</p>
                        </div>
                    ))}
                </div>

                {selectedService && (

                    <>  {/*Description */}
                        <div className="mb-3">
                            <label className="font-medium">Description</label>
                            <p>{description}</p>
                        </div>


                        {/* Price */}
                        <div className="mb-3">
                            <label className="text-sm font-medium">Price (₹)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                            />
                        </div>

                        {/* Discount */}
                        <div className="mb-3">
                            <label className="text-sm font-medium">Discount (%)</label>
                            <input
                                type="number"
                                value={discount}
                                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                            />
                        </div>

                        {/* Final Price */}
                        <div className="mb-3">
                            <label className="text-sm font-medium">Final Price (₹)</label>
                            <input
                                type="number"
                                value={finalPrice}
                                disabled
                                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-600"
                            />
                        </div>

                        {/* Notes */}
                        <div className="mb-4">
                            <label className="text-sm font-medium">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter notes..."
                                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                            />
                        </div>

                        {/* Add-ons */}
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

                            {addons.length === 0 && <p className="text-gray-500 text-sm">No add-ons yet.</p>}

                            {addons.map((addon, index) => (
                                <div key={index} className="p-3 mb-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
                                    <div className="flex justify-between mb-2">
                                        <h4 className="font-semibold text-sm">Add-on {index + 1}</h4>
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
                                        onChange={(e) => handleAddonChange(index, "title", e.target.value)}
                                        className="w-full mb-2 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={addon.price}
                                        onChange={(e) => handleAddonChange(index, "price", parseFloat(e.target.value) || 0)}
                                        className="w-full mb-2 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    />

                                    <textarea
                                        placeholder="Description"
                                        value={addon.description}
                                        onChange={(e) => handleAddonChange(index, "description", e.target.value)}
                                        rows={2}
                                        className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    />
                                </div>
                            ))}
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
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default AddNewVendorService;
