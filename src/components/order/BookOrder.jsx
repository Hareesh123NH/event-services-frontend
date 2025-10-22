import React, { useState, useEffect, useContext } from "react";
import { cartData, addresses as storedAddresses } from "../data/duplicatedata";
import { ThemeContext } from "../ThemeContext";

const BookOrder = () => {
    const { theme } = useContext(ThemeContext); // 'light' or 'dark'

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

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartServices(cart);
    }, []);

    const isFormComplete = () =>
        formData.scheduled_from && formData.scheduled_to && formData.quantity;

    const toggleServiceSelection = (service) => {
        if (activeService && activeService._id !== service._id) {
            if (!isFormComplete()) {
                setSelectedServices((prev) =>
                    prev.filter((s) => s.vendorserviceid !== activeService._id)
                );
            }
            setFormData({ scheduled_from: "", scheduled_to: "", quantity: 1 });
            setActiveService(service);
            return;
        }

        const isAlreadySelected = selectedServices.find(
            (s) => s.vendorserviceid === service._id
        );

        if (isAlreadySelected) {
            setSelectedServices((prev) =>
                prev.filter((s) => s.vendorserviceid !== service._id)
            );
            setActiveService(null);
            setFormData({ scheduled_from: "", scheduled_to: "", quantity: 1 });
        } else {
            setActiveService(service);
        }
    };

    const handleSaveForm = () => {
        if (!isFormComplete()) {
            alert("Please fill all fields before saving this service.");
            return;
        }

        setSelectedServices((prev) => {
            const exists = prev.find((s) => s.vendorserviceid === activeService._id);
            if (exists) {
                return prev.map((s) =>
                    s.vendorserviceid === activeService._id
                        ? { ...s, ...formData }
                        : s
                );
            } else {
                return [...prev, { vendorserviceid: activeService._id, ...formData }];
            }
        });

        setActiveService(null);
        setFormData({ scheduled_from: "", scheduled_to: "", quantity: 1 });
    };

    const handleSubmit = () => {
        const orderData = {
            event_addressId: selectedAddressId,
            event_date: eventDate,
            services: selectedServices,
        };
        console.log("✅ Order submitted:", orderData);
        alert("Order Booked!");
    };

    const totalAmount = selectedServices.reduce((sum, s) => {
        const service = cartServices.find((x) => x._id === s.vendorserviceid);
        return sum + (service?.final_price || 0) * (s.quantity || 1);
    }, 0);

    // Theme classes
    const pageBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900";
    const cardBg = (isSelected, isActive) => {
        if (isActive) return theme === "dark" ? "border-green-500 bg-green-800" : "border-green-900 bg-green-200";
        if (isSelected) return theme === "dark" ? "border-blue-500 bg-blue-800" : "border-blue-900 bg-blue-400";
        return theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-400 bg-white";
    };
    const panelBg = theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-500 bg-white";
    const inputBg = theme === "dark" ? "border-gray-700 bg-gray-800 text-white" : "border-gray-500 bg-white text-gray-900";

    return (
        <div className={`h-screen overflow-y-auto p-4 ${pageBg}`}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Book Order</h2>

                {/* Event Date */}
                <div className="mb-4">
                    <label className="block mb-1">Event Date:</label>
                    <input
                        type="date"
                        className={`border p-2 w-full rounded ${inputBg}`}
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
                            className={`p-3 rounded-lg min-w-[250px] flex-shrink-0 cursor-pointer transition border ${selectedAddressId === addr._id
                                ? theme === "dark" ? "border-blue-400 bg-blue-800" : "border-blue-600 bg-blue-200"
                                : theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
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
                    {cartServices.length === 0 && <div>Your cart is Empty please add It</div>}
                    {cartServices.map((service) => {
                        const isSelected = selectedServices.find(s => s.vendorserviceid === service._id);
                        const isActive = activeService?._id === service._id;
                        return (
                            <div
                                key={service._id}
                                className={`p-3 border rounded-lg min-w-[200px] flex-shrink-0 cursor-pointer transition ${cardBg(isSelected, isActive)}`}
                                onClick={() => toggleServiceSelection(service)}
                            >
                                <h4 className="font-semibold">{service.service_name}</h4>
                                <p className="text-sm">Vendor: {service.vendor.full_name}</p>
                                <p className="text-sm">Price: ₹{service.final_price}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Active Service Form */}
                {activeService && (
                    <div className={`p-3 rounded-lg mb-4 border ${panelBg}`}>
                        <h4 className="font-semibold mb-2">Fill details for: {activeService.service_name}</h4>

                        <div className="mb-2">
                            <label className="block mb-1">Scheduled From:</label>
                            <input
                                type="datetime-local"
                                className={`border p-2 w-full rounded ${inputBg}`}
                                value={formData.scheduled_from}
                                onChange={(e) => setFormData({ ...formData, scheduled_from: e.target.value })}
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">Scheduled To:</label>
                            <input
                                type="datetime-local"
                                className={`border p-2 w-full rounded ${inputBg}`}
                                value={formData.scheduled_to}
                                onChange={(e) => setFormData({ ...formData, scheduled_to: e.target.value })}
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1">Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                className={`border p-2 w-full rounded ${inputBg}`}
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>

                        <button
                            className={theme === "dark" ? "bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded" : "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"}
                            onClick={handleSaveForm}
                        >
                            Save Service
                        </button>
                    </div>
                )}

                {/* Summary */}
                {selectedServices.length > 0 && (
                    <div className={`mb-4 p-3 rounded-lg border ${panelBg}`}>
                        <h4 className="font-semibold mb-2">Selected Services Summary</h4>
                        {selectedServices.map((s) => {
                            const srv = cartServices.find((x) => x._id === s.vendorserviceid);
                            return (
                                <p key={s.vendorserviceid}>
                                    {srv?.service_name} × {s.quantity} = ₹{(srv?.final_price || 0) * s.quantity}
                                </p>
                            );
                        })}
                        <p className="mt-2 font-bold">Total: ₹{totalAmount}</p>
                    </div>
                )}

                <button
                    className={`px-4 py-2 rounded transition ${cartServices.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:opacity-90 text-white"
                        }`}
                    onClick={handleSubmit}
                    disabled={cartServices.length === 0}
                >
                    Submit Order
                </button>
            </div>
        </div>
    );
};

export default BookOrder;
