// ServiceManager.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ServiceModal } from "./Servicemodal";

// Sample initial services
const initialServices = [
  {
    service_id: "1",
    service_name: "Photography",
    description: "Event and personal photoshoots",
    base_price: 2000,
    pricing_type: "per_hour",
  },
  {
    service_id: "2",
    service_name: "Catering",
    description: "Delicious food for events",
    base_price: 5000,
    pricing_type: "per_day",
  },
  {
    service_id: "3",
    service_name: "Decoration",
    description: "Event venue decoration",
    base_price: 3000,
    pricing_type: "fixed",
  },
];

const ServiceManager = () => {
  const [allServices, setAllServices] = useState(initialServices);
  const [editingService, setEditingService] = useState(null);
  const [addingService, setAddingService] = useState(false);

  const handleSave = (serviceData) => {
    if (editingService) {
      // Update existing service
      setAllServices((prev) =>
        prev.map((s) =>
          s.service_id === editingService.service_id
            ? { ...s, ...serviceData }
            : s
        )
      );
      setEditingService(null);
    } else {
      // Add new service
      const newService = {
        ...serviceData,
        service_id: Date.now().toString(),
      };
      setAllServices((prev) => [newService, ...prev]);
      setAddingService(false);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Services
        </h1>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
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
          {allServices.map((service) => (
            <motion.div
              key={service.service_id}
              layout
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all flex flex-col justify-between relative"
            >
              {/* Edit icon */}
              <button
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-blue-500"
                onClick={() => setEditingService(service)}
              >
                <PencilIcon className="h-5 w-5" />
              </button>

              <div className="p-3 flex-1">
                <h3 className="font-semibold text-lg">{service.service_name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {service.description}
                </p>
                <p className="text-sm font-medium mt-2">
                  Price: ₹{service.base_price} ({service.pricing_type})
                </p>
              </div>
            </motion.div>
          ))}
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
