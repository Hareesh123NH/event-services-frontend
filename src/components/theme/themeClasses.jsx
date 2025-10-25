import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeTypes } from "./ThemeContext";

export const useThemeClasses = () => {

    const { theme } = useContext(ThemeContext);
    const isDark = theme === themeTypes.DARK;

    return {
        isDark: isDark,

        //Color
        iconColor: isDark ? "text-gray-300" : "text-gray-500",

        //Border
        borderClass: isDark ? "border-gray-700" : "border-gray-900",
        borderDefault: isDark ? "border-gray-700" : "border-gray-300",
        borderActive: "border-blue-500",
        borderColor: isDark ? "border-gray-700" : "border-gray-200",
        borderEditing: "border-blue-400 focus:ring-2 focus:ring-blue-300",

        //Text
        navText: isDark ? "text-white" : "text-purple-600",
        textClass: isDark ? "text-gray-200" : "text-gray-900",
        textPrimary: isDark ? "text-gray-100" : "text-gray-800",
        textSecondary: isDark ? "text-gray-400" : "text-gray-500",
        secondaryText: isDark ? "text-gray-400" : "text-gray-1200",
        fileText: isDark ? "text-blue-400" : "text-blue-600",

        //BackGround
        sectionBg: isDark ? "bg-gray-900" : "bg-gray-200",
        pageBg: isDark ? "bg-gray-900" : "bg-gray-100",
        footerBg: isDark ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900",
        navBg: isDark ? "bg-gray-900" : "bg-gray-200",
        btnBg: isDark ? "bg-purple-700 hover:bg-purple-800 text-white" : "bg-purple-600 hover:bg-purple-700 text-white",
        mobileMenuBg: isDark ? "bg-gray-800" : "bg-white",
        accentBg: isDark ? "bg-purple-800" : "bg-purple-600",
        bgService: isDark ? "bg-gray-900" : "bg-gray-50",
        containerBg: isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900",
        panelBg: isDark ? "border-gray-700 bg-gray-800" : "border-gray-500 bg-white",
        inputBg: isDark ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300",
        modalBg: isDark ? "bg-gray-800" : "bg-white",
        bgGradient: isDark ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-purple-100 to-indigo-200",
        bgClass: isDark ? "bg-gray-800 border-gray-700" : "bg-gray-200 text-gray-900",
        profileBgClass: isDark ? "bg-gray-700" : "bg-gray-300",
        dropdownBgClass: isDark ? "bg-gray-800" : "bg-white",

        //Button
        buttonPrimary: isDark ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: isDark ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white",
        buttonText: isDark ? "text-blue-400" : "text-blue-600",
        greenButton: isDark ? "bg-green-700 text-green-100" : "bg-green-100 text-green-700",
        redButton: isDark ? "bg-red-700 text-red-100" : "bg-red-100 text-red-700",
        buttonHover: isDark ? "hover:bg-gray-600" : "hover:bg-gray-200",
        cartButton: isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-red-100 hover:bg-red-200",
        buttonBlue: isDark ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",
        buttonGreen: isDark ? "bg-green-700 hover:bg-green-800 text-white" : "bg-green-500 hover:bg-green-600 text-white",
        backBtn: isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-300 text-gray-700 hover:bg-gray-400",
        formBg: isDark ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900",
        buttonBg: isDark ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white",
        cancelBtnBg: isDark ? "bg-gray-600 text-gray-100 hover:bg-gray-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400",
        saveBtnBg: isDark ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",
        buttonActiveBg: isDark ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white",
        buttonInactiveBg: isDark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-white text-gray-700 hover:bg-gray-200",
        btnBgClass: isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-black",
        authButton: isDark ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white",

        //Input
        inputDisabledBg: isDark ? "bg-gray-800 border-gray-600 text-gray-400 cursor-not-allowed" : "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed",
        imgBg: isDark ? "border-gray-700" : "border-gray-200",
        inputText: isDark ? "text-gray-100" : "text-gray-800",
        inputTextClass: isDark ? "text-gray-100" : "text-gray-900",
        inputPlaceholderClass: isDark ? "placeholder-gray-400" : "placeholder-gray-500",
        inputBg: isDark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900",

        //Label
        linkText: isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700",
        labelColor: isDark ? "text-gray-300" : "text-gray-700",
        labelClass: isDark ? "text-gray-200" : "text-gray-700",

        //Card
        cardSelected: isDark ? "bg-blue-800 border-blue-400" : "bg-blue-100 border-blue-500",
        cardBg: isDark ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900",
        cardDefault: isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-700",
        bgCard: isDark ? "bg-gray-800" : "bg-gray-200",
        cardBgActive: isDark ? "border-green-500 bg-green-800" : "border-green-900 bg-green-200",
        cardBgSelected: isDark ? "border-blue-500 bg-blue-800" : "border-blue-900 bg-blue-400",
        cardBgOrder: isDark ? "border-gray-700 bg-gray-800" : "border-gray-400 bg-white",
        cardBorder: isDark ? "border-gray-700" : "border-gray-100",
        cardSelected: isDark ? "border-purple-500 bg-purple-900" : "border-purple-500 bg-purple-100",

        //Hover
        hoverClass: isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
        tooltipClass: isDark ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900",
        dropdownHoverClass: isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
        dropdownTextClass: isDark ? "text-gray-200" : "text-gray-900",

    };
};
