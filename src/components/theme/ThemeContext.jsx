import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const themeTypes = {
    DARK: "dark", LIGHT: "light"
}


export const ThemeProvider = ({ children }) => {


    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem("app-theme");
        if (storedTheme) return storedTheme;

        // Automatically decide based on time
        const hour = new Date().getHours();
        // Example: Dark mode from 7 PM (19) to 6 AM (6)
        return hour >= 19 || hour < 6 ? themeTypes.DARK : themeTypes.LIGHT;
    };

    const [theme, setTheme] = useState(getInitialTheme);


    useEffect(() => {
        localStorage.setItem("app-theme", theme);
        if (theme === themeTypes.DARK) {
            document.documentElement.classList.add(themeTypes.DARK);
        } else {
            document.documentElement.classList.remove(themeTypes.DARK);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === themeTypes.LIGHT ? themeTypes.DARK : themeTypes.LIGHT);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
