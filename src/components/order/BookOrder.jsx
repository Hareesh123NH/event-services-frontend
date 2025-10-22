import React, { useState, useEffect } from "react";
import { cartData, addresses as storedAddresses } from "../data/duplicatedata";

const BookOrder = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [cartServices, setCartServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [activeService, setActiveService] = useState(null);
    const [formData, setFormData] = useState({
        scheduled_from: "",
        scheduled_to: "",
        quantity: 1,
    });

    useEffect(() => {
        setAddresses(storedAddresses);

        const defaultAddressId = localStorage.getItem("defaultAddressId");
        setSelectedAddressId(defaultAddressId || (storedAddresses[0]?._id || ""));

        const cart = JSON.parse(localStorage.getItem("cart"));
        setCartServices(cart);
    }, []);

    const isFormComplete = () =>
        formData.scheduled_from && formData.scheduled_to && formData.quantity;

    const toggleServiceSelection = (service) => {
        // If switching to a new service
        if (activeService && activeService._id !== service._id) {
            // If previous service form incomplete → deselect it
            if (!isFormComplete()) {
                setSelectedServices((prev) =>
                    prev.filter((s) => s.vendorserviceid !== activeService._id)
                );
            }
            // Reset form for new service
            setFormData({
                scheduled_from: "",
                scheduled_to: "",
                quantity: 1,
            });
            setActiveService(service);
            return;
        }

        // If clicking the same service again
        const isAlreadySelected = selectedServices.find(
            (s) => s.vendorserviceid === service._id
        );

        if (isAlreadySelected) {
            // Deselect if already selected
            setSelectedServices((prev) =>
                prev.filter((s) => s.vendorserviceid !== service._id)
            );
            setActiveService(null);
            setFormData({
                scheduled_from: "",
                scheduled_to: "",
                quantity: 1,
            });
        } else {
            // Select new service and open form
            setActiveService(service);
        }
    };

    const handleSaveForm = () => {
        if (!isFormComplete()) {
            alert("Please fill all fields before saving this service.");
            return;
        }

        // Save this service details
        setSelectedServices((prev) => {
            const exists = prev.find((s) => s.vendorserviceid === activeService._id);
            if (exists) {
                return prev.map((s) =>
                    s.vendorserviceid === activeService._id
                        ? {
                            ...s,
                            ...formData,
                        }
                        : s
                );
            } else {
                return [
                    ...prev,
                    {
                        vendorserviceid: activeService._id,
                        ...formData,
                    },
                ];
            }
        });

        // Keep it selected
        setActiveService(null);
        setFormData({
            scheduled_from: "",
            scheduled_to: "",
            quantity: 1,
        });
    };

    const handleSubmit = () => {
        const orderData = {
            event_addressId: selectedAddressId,
            event_date: eventDate,
            services: selectedServices,
        };
        console.log("✅ Order submitted:", orderData);
    };

    // Calculate total amount of selected services
    const totalAmount = selectedServices.reduce((sum, s) => {
        const service = cartServices.find((x) => x._id === s.vendorserviceid);
        return sum + (service?.final_price || 0) * (s.quantity || 1);
    }, 0);

    return (
        <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Book Order</h2>

                {/* Event Date */}
                <div className="mb-4">
                    <label className="block mb-1">Event Date:</label>
                    <input
                        type="date"
                        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 w-full rounded"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>

                {/* Address Selection */}
                <h3 className="text-xl font-semibold mb-2">Select Address</h3>
                <div className="flex space-x-4 overflow-x-auto mb-4">
                    {addresses.map((addr) => (
                        <div
                            key={addr._id}
                            className={`p-3 border rounded-lg min-w-[250px] flex-shrink-0 cursor-pointer transition ${selectedAddressId === addr._id
                                    ? "border-blue-500 bg-blue-100 dark:bg-blue-800 dark:border-blue-400"
                                    : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                }`}
                            onClick={() => setSelectedAddressId(addr._id)}
                        >
                            <p className="font-semibold">{addr.label}</p>
                            <p>{addr.address_line1}, {addr.address_line2}</p>
                            <p>{addr.city}, {addr.state} - {addr.postal_code}</p>
                            <p>{addr.country}</p>
                            <p>Phone: {addr.alternate_phone}</p>
                        </div>
                    ))}
                </div>

                {/* Services */}
                <h3 className="text-xl font-semibold mb-2">Select Services</h3>
                <div className="flex space-x-4 overflow-x-auto mb-4">
                    {cartServices.map((service) => {
                        const isSelected = selectedServices.find(
                            (s) => s.vendorserviceid === service._id
                        );
                        const isActive = activeService?._id === service._id;
                        return (
                            <div
                                key={service._id}
                                className={`p-3 border rounded-lg min-w-[200px] flex-shrink-0 cursor-pointer transition ${isActive
                                        ? "border-green-500 bg-green-100 dark:bg-green-800"
                                        : isSelected
                                            ? "border-blue-500 bg-blue-100 dark:bg-blue-800"
                                            : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    }`}
                                onClick={() => toggleServiceSelection(service)}
                            >
                                <h4 className="font-semibold">{service.service_name}</h4>
                                <p className="text-sm">Vendor: {service.vendor.full_name}</p>
                                <p className="text-sm">Price: ₹{service.final_price}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Show form only for activeService */}
                {activeService && (
                    <div className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800 mb-4">
                        <h4 className="font-semibold mb-2">
                            Fill details for: {activeService.service_name}
                        </h4>

                        <div className="mb-2">
                            <label className="block mb-1">Scheduled From:</label>
                            <input
                                type="datetime-local"
                                className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded"
                                value={formData.scheduled_from}
                                onChange={(e) =>
                                    setFormData({ ...formData, scheduled_from: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">Scheduled To:</label>
                            <input
                                type="datetime-local"
                                className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded"
                                value={formData.scheduled_to}
                                onChange={(e) =>
                                    setFormData({ ...formData, scheduled_to: e.target.value })
                                }
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({ ...formData, quantity: e.target.value })
                                }
                            />
                        </div>

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:opacity-90"
                            onClick={handleSaveForm}
                        >
                            Save Service
                        </button>
                    </div>
                )}

                {/* Summary */}
                {selectedServices.length > 0 && (
                    <div className="mb-4 border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800">
                        <h4 className="font-semibold mb-2">Selected Services Summary</h4>
                        {selectedServices.map((s) => {
                            const srv = cartServices.find((x) => x._id === s.vendorserviceid);
                            return (
                                <p key={s.vendorserviceid}>
                                    {srv?.service_name} × {s.quantity} = ₹
                                    {(srv?.final_price || 0) * s.quantity}
                                </p>
                            );
                        })}
                        <p className="mt-2 font-bold">Total: ₹{totalAmount}</p>
                    </div>
                )}

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
                    onClick={handleSubmit}
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default BookOrder;
