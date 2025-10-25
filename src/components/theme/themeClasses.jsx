import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";


export const useThemeClasses = () => {

    const { theme } = useContext(ThemeContext);

    return {

        //Border
        borderClass: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-900",
        borderDefault: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-300",
        borderActive: "border-blue-500",

        //Text
        textClass: theme === themeTypes.DARK ? "text-gray-200" : "text-gray-900",

        //BackGround
        sectionBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-200",
        pageBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-100",
        inputBg: theme === themeTypes.DARK ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300",

        //Button
        buttonPrimary: theme === themeTypes.DARK ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: theme === themeTypes.DARK ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white",


    };
};
