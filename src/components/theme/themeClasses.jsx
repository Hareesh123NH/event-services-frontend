import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeTypes } from "./ThemeContext";

export const useThemeClasses = () => {

    const { theme } = useContext(ThemeContext);
    const isDark = theme === themeTypes.DARK;

    return {

        //Border
        borderClass: isDark ? "border-gray-700" : "border-gray-900",
        borderDefault: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-300",
        borderActive: "border-blue-500",
        borderColor: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-200",
        borderEditing: "border-blue-400 focus:ring-2 focus:ring-blue-300",

        //Text
        textClass: isDark ? "text-gray-200" : "text-gray-900",
        navText: theme === themeTypes.DARK ? "text-white" : "text-purple-600",
        textPrimary: theme === themeTypes.DARK ? "text-gray-100" : "text-gray-800",
        textSecondary: theme === themeTypes.DARK ? "text-gray-400" : "text-gray-500",

        //BackGround
        sectionBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-200",
        pageBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-100",
        footerBg: theme === themeTypes.DARK ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900",
        navBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-200",
        btnBg: theme === themeTypes.DARK ? "bg-purple-700 hover:bg-purple-800 text-white" : "bg-purple-600 hover:bg-purple-700 text-white",
        mobileMenuBg: theme === themeTypes.DARK ? "bg-gray-800" : "bg-white",
        accentBg: theme === themeTypes.DARK ? "bg-purple-800" : "bg-purple-600",
        bgClass: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-50",
        bgService: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-50",
        containerBg: theme === themeTypes.DARK ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900",
        panelBg: theme === themeTypes.DARK ? "border-gray-700 bg-gray-800" : "border-gray-500 bg-white",

        //Button
        buttonPrimary: theme === themeTypes.DARK ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: theme === themeTypes.DARK ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white",
        buttonText: theme === themeTypes.DARK ? "text-blue-400" : "text-blue-600",
        greenButton: theme === themeTypes.DARK ? "bg-green-700 text-green-100" : "bg-green-100 text-green-700",
        redButton: theme === themeTypes.DARK ? "bg-red-700 text-red-100" : "bg-red-100 text-red-700",
        buttonHover: theme === themeTypes.DARK ? "hover:bg-gray-600" : "hover:bg-gray-200",
        cartButton: theme === themeTypes.DARK ? "bg-gray-700 hover:bg-gray-600" : "bg-red-100 hover:bg-red-200",
        buttonBlue: theme === themeTypes.DARK ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",
        buttonGreen: theme === themeTypes.DARK ? "bg-green-700 hover:bg-green-800 text-white" : "bg-green-500 hover:bg-green-600 text-white",
        backBtn: theme === themeTypes.DARK ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-300 text-gray-700 hover:bg-gray-400",
        formBg: theme === themeTypes.DARK ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900",
        buttonBg: isDark ? "bg-purple-700 hover:bg-purple-800" : "bg-purple-600 hover:bg-purple-700",

        //Input
        inputDisabledBg: theme === themeTypes.DARK ? "bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed" : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed",
        inputBg: theme === themeTypes.DARK ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300",
        imgBg: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-200",
        inputText: theme === themeTypes.DARK ? "text-gray-100" : "text-gray-800",

        //Label
        linkText: isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700",
        labelColor: isDark ? "text-gray-300" : "text-gray-700",

        //Card
        cardSelected: theme === themeTypes.DARK ? "bg-blue-800 border-blue-400" : "bg-blue-100 border-blue-500",
        cardBg: theme === themeTypes.DARK ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900",
        cardDefault: theme === themeTypes.DARK ? "bg-gray-800 border-gray-700" : "bg-white border-gray-700",
        bgCard: theme === themeTypes.DARK ? "bg-gray-800" : "bg-gray-200",
        cardBgActive: theme === themeTypes.DARK ? "border-green-500 bg-green-800" : "border-green-900 bg-green-200",
        cardBgSelected: theme === themeTypes.DARK ? "border-blue-500 bg-blue-800" : "border-blue-900 bg-blue-400",
        cardBgOrder: theme === themeTypes.DARK ? "border-gray-700 bg-gray-800" : "border-gray-400 bg-white",

    };
};
