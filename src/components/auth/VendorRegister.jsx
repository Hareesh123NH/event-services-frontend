import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    description: "",
    address: "",
    aadhar_card: null,
    pan_card: null,
    business_document: null,
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpValue, setOtpValue] = useState(""); // track OTP input
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const services = [
    { _id: "1", name: "Catering", base_price: "2000", pricing_type: "per day" },
    {
      _id: "2",
      name: "Decoration",
      base_price: "1500",
      pricing_type: "per day",
    },
    {
      _id: "3",
      name: "Photography",
      base_price: "1000",
      pricing_type: "per hour",
    },
    { _id: "4", name: "Music Band", base_price: "5000", pricing_type: "fixed" },
    { _id: "5", name: "Lighting", base_price: "800", pricing_type: "per hour" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtpValue(value);
    setFormData({ ...formData, otp: value });
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter email first to send OTP.");
      return;
    }
    setOtpSent(true);
    setOtpTimer(30);
    setFormData({...formData,otp:""})
    alert(`OTP sent to ${formData.email}`);
  };

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    } else if (otpTimer === 0 && otpSent) {
      // Re-enable Send OTP button after 30s
      setOtpSent(false);
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpSent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData, selectedServiceId };
    console.log("Vendor Registration Data:", submitData);
    alert("Vendor Registered Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-purple-100 to-indigo-200">
      <LeftSideImage
        url={
          "https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png"
        }
      />

      <div className="md:w-1/2 w-full bg-white flex justify-center items-center p-8 md:p-16">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Vendor Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter vendor name"
                required
              />
            </div>

            {/* Email + OTP */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="example@email.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSent}
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${
                    otpSent
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } transition`}
                >
                  {otpSent ? `Resend in ${otpTimer}s` : "Send OTP"}
                </button>
              </div>

              {/* OTP input visible if user typed or otpSent */}
              {(otpSent || otpValue) && (
                <div className="mt-3">
                  <label className="block text-gray-700 font-medium mb-2">
                    OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    value={formData.otp}
                    onChange={handleOtpChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter OTP"
                  />
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="+91 9876543210"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your business or services"
                rows="3"
              ></textarea>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter business address"
                required
              />
            </div>

            {/* File Uploads */}
            {/* Aadhar Card */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium mb-1">
                Aadhar Card
              </label>
              <div className="flex items-center space-x-3">
                {/* Choose File button (left) */}
                <label
                  htmlFor="aadhar_card"
                  className="cursor-pointer inline-block bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
                >
                  Choose File
                </label>

                {/* Hidden file input */}
                <input
                  id="aadhar_card"
                  type="file"
                  name="aadhar_card"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="hidden"
                />

                {/* File name field (right) */}
                <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                  <span className="text-sm text-gray-700 truncate">
                    {formData.aadhar_card
                      ? formData.aadhar_card.name
                      : "No file chosen"}
                  </span>
                  {formData.aadhar_card && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, aadhar_card: null })
                      }
                      className="text-gray-500 hover:text-red-500 ml-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* PAN Card */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium mb-1">PAN Card</label>
              <div className="flex items-center space-x-3">
                <label
                  htmlFor="pan_card"
                  className="cursor-pointer inline-block bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
                >
                  Choose File
                </label>
                <input
                  id="pan_card"
                  type="file"
                  name="pan_card"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                  <span className="text-sm text-gray-700 truncate">
                    {formData.pan_card
                      ? formData.pan_card.name
                      : "No file chosen"}
                  </span>
                  {formData.pan_card && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, pan_card: null })
                      }
                      className="text-gray-500 hover:text-red-500 ml-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Business Document */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium mb-1">
                Business Document
              </label>
              <div className="flex items-center space-x-3">
                <label
                  htmlFor="business_document"
                  className="cursor-pointer inline-block bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200"
                >
                  Choose File
                </label>
                <input
                  id="business_document"
                  type="file"
                  name="business_document"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleChange}
                  className="hidden"
                />
                <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 w-full bg-gray-50">
                  <span className="text-sm text-gray-700 truncate">
                    {formData.business_document
                      ? formData.business_document.name
                      : "No file chosen"}
                  </span>
                  {formData.business_document && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, business_document: null })
                      }
                      className="text-gray-500 hover:text-red-500 ml-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Select Service
              </h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedServiceId(service._id)}
                    className={`p-4 border rounded-lg min-w-[180px] cursor-pointer text-center transition ${
                      selectedServiceId === service._id
                        ? "border-purple-500 bg-purple-100"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <p className="font-semibold text-gray-800">
                      {service.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{service.base_price} ({service.pricing_type})
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Register Vendor
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorRegister;
