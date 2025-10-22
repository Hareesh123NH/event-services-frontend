import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";

const VendorRegister = () => {
  const { theme } = useContext(ThemeContext); // ✅ use theme
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
  const [otpValue, setOtpValue] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const services = [
    { _id: "1", name: "Catering", base_price: "2000", pricing_type: "per day" },
    { _id: "2", name: "Decoration", base_price: "1500", pricing_type: "per day" },
    { _id: "3", name: "Photography", base_price: "1000", pricing_type: "per hour" },
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
    setFormData({ ...formData, otp: "" });
    alert(`OTP sent to ${formData.email}`);
  };

  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    } else if (otpTimer === 0 && otpSent) {
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

  // ✅ Theme-based classes
  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-800 to-gray-900"
      : "bg-gradient-to-br from-purple-100 to-indigo-200";
  const formBg = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900";
  const labelColor = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const inputBg =
    theme === "dark"
      ? "bg-gray-700 border-gray-600 focus:ring-purple-500"
      : "bg-white border-gray-300 focus:ring-purple-500";
  const buttonBg =
    theme === "dark"
      ? "bg-purple-700 hover:bg-purple-800 text-white"
      : "bg-purple-600 hover:bg-purple-700 text-white";
  const cardBg =
    theme === "dark"
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-800";
  const cardSelected =
    theme === "dark"
      ? "border-purple-500 bg-purple-900"
      : "border-purple-500 bg-purple-100";

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${bgGradient}`}>
      <LeftSideImage
        url={
          "https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png"
        }
      />

      <div className={`md:w-1/2 w-full ${formBg} flex justify-center items-center p-8 md:p-16`}>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center text-purple-500 mb-8">
            Vendor Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Vendor Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter vendor name"
                required
              />
            </div>

            {/* Email + OTP */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                  placeholder="example@email.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSent}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${otpSent ? "bg-gray-400 cursor-not-allowed" : buttonBg
                    }`}
                >
                  {otpSent ? `Resend in ${otpTimer}s` : "Send OTP"}
                </button>
              </div>

              {(otpSent || otpValue) && (
                <div className="mt-3">
                  <label className={`block font-medium mb-2 ${labelColor}`}>
                    OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    value={formData.otp}
                    onChange={handleOtpChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                    placeholder="Enter OTP"
                  />
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter password"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="+91 9876543210"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Describe your business or services"
                rows="3"
              ></textarea>
            </div>

            {/* Address */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter business address"
                required
              />
            </div>

            {/* File Uploads */}
            {["aadhar_card", "pan_card", "business_document"].map((field) => (
              <div key={field} className="flex flex-col space-y-2">
                <label className={`${labelColor} font-medium mb-1 capitalize`}>
                  {field.replace("_", " ")}
                </label>
                <div className="flex items-center space-x-3">
                  <label
                    htmlFor={field}
                    className={`cursor-pointer inline-block bg-gray-100 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 ${theme === "dark" ? "bg-gray-900 text-gray-200 border-gray-600 hover:bg-gray-600" : ""
                      }`}
                  >
                    Choose File
                  </label>
                  <input
                    id={field}
                    type="file"
                    name={field}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div
                    className={`flex items-center justify-between border rounded-lg px-3 py-2 w-full ${theme === "dark"
                        ? "border-gray-600 bg-gray-700"
                        : "border-gray-300 bg-gray-50"
                      }`}
                  >
                    <span className="text-sm truncate">
                      {formData[field] ? formData[field].name : "No file chosen"}
                    </span>
                    {formData[field] && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, [field]: null })}
                        className="text-gray-500 hover:text-red-500 ml-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Service Selection */}
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${labelColor}`}>
                Select Service
              </h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedServiceId(service._id)}
                    className={`p-4 border rounded-lg min-w-[180px] cursor-pointer text-center transition ${selectedServiceId === service._id ? cardSelected : cardBg
                      }`}
                  >
                    <p className="font-semibold">{service.name}</p>
                    <p className="text-sm opacity-80">
                      ₹{service.base_price} ({service.pricing_type})
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold transition ${buttonBg}`}
            >
              Register Vendor
            </button>
          </form>
          <div className={`text-center mt-4 text-sm ${labelColor}`}>
            Already have an account?{" "}
            <Link to="/login" className={"text-purple-600 hover:underline"}>
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorRegister;
