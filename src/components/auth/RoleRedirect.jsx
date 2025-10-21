// src/auth/RoleRedirect.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRedirect = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    switch (user.role) {
        case "user":
            return <Navigate to="/dashboard/home" replace />;
        case "vendor":
            return <Navigate to="/dashboard/pending-orders" replace />;
        case "admin":
            return <Navigate to="/dashboard/vendor-registrations" replace />;
        default:
            return <Navigate to="/login" replace />;
    }
};

export default RoleRedirect;
