// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        const coords = localStorage.getItem("coords");
        const theme = localStorage.getItem("app-theme");
        // Clear all local and session data
        localStorage.clear();
        sessionStorage.clear();

        // Restore coords
        if (coords) {
            localStorage.setItem("coords", coords);
        }
        if (theme) {
            localStorage.setItem("app-theme", theme);
        }

        // Clear user context / state
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


export const logoutUser = () => {
    const coords = localStorage.getItem("coords");
    const theme = localStorage.getItem("app-theme");
    localStorage.clear();
    sessionStorage.clear();
    if (coords) localStorage.setItem("coords", coords);
    if (theme) localStorage.setItem("app-theme", theme);
};