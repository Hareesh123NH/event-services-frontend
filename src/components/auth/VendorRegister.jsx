import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/service/");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setOtpMessage("⚠️ Please enter email first.");
      return;
    }
    try {
      setSendingOtp(true);
      setOtpMessage("");
      const res = await api.post(`/auth/send-otp?email=${encodeURIComponent(formData.email)}`);
      setOtpSent(true);
      setOtpTimer(30);
      setOtpMessage(res.data.message);
    } catch (err) {
      setOtpMessage(err.response?.data?.message || "❌ Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  useEffect(() => {
    if (otpTimer > 0) {
      const t = setTimeout(() => setOtpTimer((x) => x - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [otpTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterMessage("");
    setRegistering(true);

    if (!selectedServiceId) {
      alert("Please select a service.");
      setRegistering(false);
      return;
    }

    const coords = await getCoordsFromAddressHelper(formData.address);
    if (!coords) {
      alert("Could not find location for this address. Please check it.");
      setRegistering(false);
      return;
    }

    formData.location = { type: "Point", coordinates: coords };

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

    if (formData.aadhar_card) formDataToSend.append("aadhar", formData.aadhar_card);
    if (formData.pan_card) formDataToSend.append("pancard", formData.pan_card);
    if (formData.business_document)
      formDataToSend.append("business_doc", formData.business_document);

    try {
      const res = await api.post("/auth/vendor-register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRegisterMessage(res.data.message || "🎉 Vendor Registered Successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setRegisterMessage(err.response?.data?.error || "❌ Registration failed!");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0620] via-[#1b0740] to-[#3b0f5a] p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
        <h1 className="text-white text-2xl sm:text-3xl font-extrabold text-center">
          Vendor Register
        </h1>

        {registerMessage && (
          <div
            className={`mt-4 text-xs sm:text-sm p-3 rounded text-center ${
              registerMessage.includes("success")
                ? "text-green-300 bg-green-900/20"
                : "text-red-300 bg-red-900/20"
            }`}
          >
            {registerMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-6 text-sm sm:text-base"
        >
          {/* Name */}
          <div>
            <label className="block text-[#d9cfff] mb-2">Vendor Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white placeholder-white/60"
              placeholder="Enter vendor name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#d9cfff] mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white"
              placeholder="+91 9876543210"
            />
          </div>

          {/* Email + OTP */}
          <div className="flex flex-col">
            <label className="block text-[#d9cfff] mb-2">Email</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white placeholder-white/60"
                placeholder="example@email.com"
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpTimer > 0 || sendingOtp}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:opacity-95 disabled:opacity-60"
              >
                {sendingOtp
                  ? "Sending..."
                  : otpTimer > 0
                  ? `Wait ${otpTimer}s`
                  : otpSent
                  ? "Resend"
                  : "Send OTP"}
              </button>
            </div>
            {otpMessage && (
              <p className="text-purple-200 text-xs sm:text-sm mt-1 text-center">
                {otpMessage}
              </p>
            )}
          </div>

          {/* OTP */}
          {otpSent && (
            <div>
              <label className="block text-[#d9cfff] mb-2">OTP</label>
              <input
                type="number"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white"
                placeholder="Enter OTP"
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="relative md:col-span-2">
            <label className="block text-[#d9cfff] mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white pr-12"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[45px] sm:top-[50px] -translate-y-1/2 text-white/70 hover:text-white text-xs sm:text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-[#d9cfff] mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white"
              placeholder="Describe your business or services"
              rows="3"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-[#d9cfff] mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/6 border border-white/8 text-white"
              placeholder="Enter business address"
            />
          </div>

          {/* Files */}
          {[
            ["aadhar_card", "Aadhar Card"],
            ["pan_card", "PAN Card"],
            ["business_document", "Business Document"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-[#d9cfff] mb-2">{label}</label>
              <input
                type="file"
                name={field}
                onChange={handleChange}
                className="w-full text-white text-xs sm:text-sm"
              />
              {formData[field] && (
                <p className="text-xs sm:text-sm text-purple-200">
                  {formData[field].name}
                </p>
              )}
            </div>
          ))}

          {/* Service */}
          <div className="md:col-span-2">
            <label className="block text-[#d9cfff] mb-2">Select Service</label>
            <div className="flex gap-3 overflow-x-auto">
              {services.map((service) => (
                <div
                  key={service._id || service.service_id}
                  onClick={() =>
                    setSelectedServiceId(service._id || service.service_id)
                  }
                  className={`p-3 border rounded-lg min-w-[140px] cursor-pointer text-center ${
                    selectedServiceId === (service._id || service.service_id)
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-white/80"
                  }`}
                >
                  <p className="font-semibold text-sm sm:text-base">
                    {service.service_name}
                  </p>
                  <p className="text-xs sm:text-sm">₹{service.base_price}({service.pricing_type})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={registering}
              className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:opacity-95 disabled:opacity-60 text-sm sm:text-base"
            >
              {registering ? "Registering..." : "Register Vendor"}
            </button>
          </div>

          <p className="md:col-span-2 text-center text-xs sm:text-sm text-[#d9cfff] mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-200 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VendorRegister;
