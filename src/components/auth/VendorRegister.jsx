import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeftSideImage from "./LeftSideImage";
import { Link, useNavigate } from "react-router-dom";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import { getCoordsFromAddressHelper } from "../user/location";

const VendorRegister = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    phone_number: "",
    description: "",
    address: "",
    aadhar_card: null,
    pan_card: null,
    business_document: null,
    location: null,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [services, setServices] = useState([]);

  // 🎯 Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/service/");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();

  }, []);



  // 🔄 Handle input/file changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // 📤 Send OTP
  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter email first to send OTP.");
      return;
    }
    setOtpSent(true);
    setOtpTimer(30);
    setFormData((prev) => ({ ...prev, otp: "" }));
    alert(`OTP sent to ${formData.email}`);
  };

  // ⏱️ Countdown for OTP resend
  useEffect(() => {
    let timer;
    if (otpSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer((prev) => prev - 1), 1000);
    } else if (otpTimer === 0 && otpSent) {
      setOtpSent(false);
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpSent]);

  // 🧾 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedServiceId) {
      alert("Please select a service.");
      return;
    }

    if (!formData.aadhar_card && !formData.pan_card) {
      alert("Please provide necesaary documents!");
      return;
    }

    // ✅ Get coordinates from address using helper
    const coords = await getCoordsFromAddressHelper(formData.address);

    if (coords) {
      formData.location = {
        type: "Point",
        coordinates: coords, // [lon, lat]
      };
    } else {
      alert("Could not find location for this address. Please check it.");
      return;
    }


    const formDataToSend = new FormData();
    formDataToSend.append("vendor_name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("otp", formData.otp);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("phonenumber", formData.phone_number);
    formDataToSend.append("desc", formData.description);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("service_id", selectedServiceId);
    formDataToSend.append("location", JSON.stringify(formData.location));

    if (formData.aadhar_card)
      formDataToSend.append("aadhar", formData.aadhar_card);
    if (formData.pan_card)
      formDataToSend.append("pancard", formData.pan_card);
    if (formData.business_document)
      formDataToSend.append("business_doc", formData.business_document);

    try {
      const res = await api.post("/auth/vendor-register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Vendor Registered Successfully!");
      console.log("Response:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      alert(err.response?.data?.error || "Registration failed!");
    }
  };

  // 🎨 Theme classes
  const { bgGradient, formBg, labelColor, inputBg, btnBg, cardSelected, cardBg, isDark } =
    useThemeClasses();

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${bgGradient}`}>
      {/* Left Side Image */}
      <div className="hidden md:flex md:w-1/2">
        <LeftSideImage url="https://irentmo.com/wp-content/uploads/2023/04/Screen-Shot-2023-05-01-at-7.14.07-AM-min-1-300x200.png" />
      </div>

      {/* Right Side Form */}
      <div
        className={`md:w-1/2 w-full ${formBg} flex justify-center items-center px-5 py-10 md:p-16 overflow-y-auto`}
      >
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <h2 className="p-5 text-2xl sm:text-3xl font-bold text-center text-purple-500 mb-6">
            Vendor Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 pb-6">
            {/* Vendor Name */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Vendor Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter vendor name"
                required
              />
            </div>

            {/* Email + OTP */}
            <div>
              <label className={`block font-medium mb-2 ${labelColor}`}>
                Email
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                  placeholder="example@email.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpSent}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${otpSent ? "bg-gray-400 cursor-not-allowed" : btnBg
                    }`}
                >
                  {otpSent ? `Resend in ${otpTimer}s` : "Send OTP"}
                </button>
              </div>

              {(otpSent || formData.otp) && (
                <div className="mt-3">
                  <label className={`block font-medium mb-2 ${labelColor}`}>
                    OTP
                  </label>
                  <input
                    type="number"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${inputBg}`}
                placeholder="Enter business address"
                required
              />
            </div>

            {/* File Uploads */}
            {[
              ["aadhar_card", "Aadhar Card"],
              ["pan_card", "PAN Card"],
              ["business_document", "Business Document"],
            ].map(([field, label]) => (
              <div key={field} className="flex flex-col space-y-2">
                <label className={`${labelColor} font-medium`}>{label}</label>
                <div className="flex items-center space-x-3">
                  <label
                    htmlFor={field}
                    className={`cursor-pointer inline-block border rounded-lg px-4 py-2 ${isDark
                      ? "bg-gray-800 text-gray-200 border-gray-600"
                      : "bg-gray-100 text-gray-700 border-gray-300"
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
                    className={`flex items-center justify-between border rounded-lg px-3 py-2 w-full text-sm truncate ${isDark
                      ? "border-gray-600 bg-gray-700"
                      : "border-gray-300 bg-gray-50"
                      }`}
                  >
                    <span>
                      {formData[field]
                        ? formData[field].name
                        : "No file chosen"}
                    </span>
                    {formData[field] && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, [field]: null })
                        }
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
              <h3 className={`text-lg font-semibold mb-2 ${labelColor}`}>
                Select Service
              </h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {services.map((service) => (
                  <div
                    key={service.service_id || service._id}
                    onClick={() =>
                      setSelectedServiceId(service.service_id || service._id)
                    }
                    className={`p-3 border rounded-lg min-w-[160px] cursor-pointer text-center transition ${selectedServiceId ===
                      (service.service_id || service._id)
                      ? cardSelected
                      : cardBg
                      }`}
                  >
                    <p className="font-semibold">{service.service_name}</p>
                    <p className="text-sm opacity-80">
                      ₹{service.base_price} ({service.pricing_type})
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 mt-2 rounded-lg font-semibold transition ${btnBg}`}
            >
              Register Vendor
            </button>
          </form>

          <div className={`text-center mt-4 text-sm ${labelColor}`}>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorRegister;
