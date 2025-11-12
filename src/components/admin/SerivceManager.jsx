import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ServiceModal } from "./Servicemodal";
import { useThemeClasses } from "../theme/themeClasses";
import api from "../axiosConfig";
import logo from "../../assets/ES_logo.png";
import { PenSquareIcon } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { filtersList } from "../data/duplicatedata";


const ServiceManager = () => {

  const { search } = useOutletContext();

  const [allServices, setAllServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [addingService, setAddingService] = useState(false);


  const filterMap = new Map(
    filtersList.map(f => [f.title.trim().toLowerCase(), f.image])
  );

  const getFilterImage = (service_name) => {
    console.log(service_name);
    return filterMap.get(service_name.trim().toLowerCase()) || logo;
  };


  const fetchServices = async () => {
    try {
      const res = await api.get("/service");
      setAllServices(res.data);

    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);


  const filteredAllServices = allServices?.filter(service => {
    const searchTerm = search.toLowerCase();

    return (
      service._id?.toLowerCase().includes(searchTerm) ||
      service.service_name?.toLowerCase().includes(searchTerm) ||
      service.description?.toLowerCase().includes(searchTerm) ||
      service.created_by?.toLowerCase().includes(searchTerm) ||
      service.pricing_type?.toLowerCase().includes(searchTerm) ||
      service.base_price?.toString().includes(searchTerm) ||
      service.createdAt?.toLowerCase().includes(searchTerm) ||
      service.updatedAt?.toLowerCase().includes(searchTerm)
    );
  });


  const handleSave = async (serviceData) => {
    try {
      if (editingService) {
        const res = await api.put(`/service/${editingService._id}`, serviceData);
        const updated = {
          ...res.data.service,
          _id: res.data.service.service_id,
        };

        setAllServices((prev) =>
          prev.map((s) => (s._id === editingService._id ? updated : s))
        );

        setEditingService(null);
      }
      else {

        await api.post("/service/create", serviceData);

        fetchServices();

        setAddingService(false);
      }
    } catch (error) {
      alert(error.response.data?.message);
      console.error("Error saving service:", error.response);
    }

  };



  // Theme-based classes
  const { pageBg, cardBg, textPrimary, textSecondary, buttonBg, isDark } = useThemeClasses();


  return (
    <div className={`p-4 min-h-screen ${pageBg}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-semibold ${textPrimary}`}>Services</h1>
        <button
          className="flex items-center justify-center px-4 py-2 bg-green-200 hover:bg-green-300 text-green-800 rounded-xl shadow-sm transition-all"
          onClick={() => setAddingService(true)}
        >
          <PlusIcon className="h-5 w-5" />
          Add Service
        </button>
      </div>

      {/* Scrollable Services Grid */}
      <div className="max-h-[70vh] overflow-y-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* ✅ Shimmer while loading */}
          {!filteredAllServices || filteredAllServices.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                layout
                className={`${cardBg} rounded-xl shadow-md overflow-hidden animate-pulse`}
              >
                <div className="h-40 bg-gray-400/40 w-full"></div>
                <div className="p-3">
                  <div className="h-4 w-3/4 bg-gray-400/40 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-400/40 rounded mb-2"></div>
                  <div className="h-3 w-5/6 bg-gray-400/40 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-gray-400/40 rounded"></div>
                </div>
              </motion.div>
            ))
          ) : (
            filteredAllServices.map((service) => (
              <motion.div
                key={service._id}
                layout
                whileHover={{ scale: 1.03 }}
                className={`${cardBg} rounded-xl shadow hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden`}
              >
                {/* ✅ Service Image */}
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-t-xl flex items-center justify-center">
                  <img
                    src={getFilterImage(service.service_name)}
                    alt={service.service_name}
                    onError={(e) => (e.currentTarget.src = logo)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* ✅ Service Info */}
                <div className="p-3 flex-1">
                  {/* Service name + Edit button on the same row */}
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-lg ${textPrimary}`}>
                      {service.service_name}
                    </h3>
                    <button
                      className={`p-1 rounded cursor-pointer transition-colors ${isDark
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-500 hover:text-blue-500"
                        }`}
                      onClick={() => setEditingService(service)}
                    >
                      <PenSquareIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <p className={`text-xs mt-1 ${textSecondary}`}>
                    {service.description}
                  </p>
                  <p className={`text-sm font-medium mt-2 ${textPrimary}`}>
                    Price: ₹{service.base_price} ({service.pricing_type})
                  </p>
                </div>
              </motion.div>
            ))
          )
          }
        </motion.div>
      </div>

      {/* Modal */}
      {(editingService || addingService) && (
        <ServiceModal
          service={editingService}
          onClose={() => {
            setEditingService(null);
            setAddingService(false);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );

};

export default ServiceManager;
