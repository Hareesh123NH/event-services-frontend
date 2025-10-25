import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themeTypes } from "./ThemeContext";

export const useThemeClasses = () => {
    
    
   
  
 

    const { theme } = useContext(ThemeContext);
    return {

        //Color
         iconColor : theme === themeTypes.DARK ? "text-gray-300" : "text-gray-500",

        //Border
        borderClass: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-900",
        borderDefault: theme === themeTypes.DARK ? "border-gray-700" : "border-gray-300",
        borderActive: "border-blue-500",
        borderColor :theme === themeTypes.DARK ? "border-gray-700" : "border-gray-900",

        //Text
        textClass: theme === themeTypes.DARK ? "text-gray-200" : "text-gray-900",
        textPrimary : theme === themeTypes.DARK ? "text-gray-100" : "text-gray-800",
        textSecondary : theme === themeTypes.DARK ? "text-gray-400" : "text-gray-500",
        secondaryText : theme === themeTypes.DARK? "text-gray-400" : "text-gray-1200",

        //BackGround
        sectionBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-200",
        pageBg: theme === themeTypes.DARK ? "bg-gray-900" : "bg-gray-100",
        inputBg: theme === themeTypes.DARK ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300",
        modalBg :theme === themeTypes.DARK ? "bg-gray-800" : "bg-white",
        bgGradient :theme === themeTypes.DARK? "bg-gradient-to-br from-gray-800 to-gray-900": "bg-gradient-to-br from-purple-100 to-indigo-200",
        bgClass : theme === themeTypes.DARK ? "bg-gray-800 border-gray-700" : "bg-gray-200 text-gray-900",

        //Button
        buttonPrimary: theme === themeTypes.DARK ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white",
        buttonSecondary: theme === themeTypes.DARK ? "bg-green-600 hover:bg-green-700 text-white" : "bg-green-500 hover:bg-green-600 text-white",
        buttonBg : theme === themeTypes.DARK ? "bg-blue-700 hover:bg-blue-800 text-white" : "bg-blue-600 hover:bg-blue-700 text-white",
        cancelBtnBg : theme === themeTypes.DARK ? "bg-gray-600 text-gray-100 hover:bg-gray-500" : "bg-gray-300 text-gray-800 hover:bg-gray-400",
        saveBtnBg : theme === themeTypes.DARK? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white",
        buttonActiveBg : theme === themeTypes.DARK ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white",
        buttonInactiveBg : theme === themeTypes.DARK ? "bg-gray-700 text-gray-200 hover:bg-gray-600":"bg-white text-gray-700 hover:bg-gray-200",
         btnBgClass : theme === themeTypes.DARK? "bg-gray-800 text-white" : "bg-gray-200 text-black",
         profileBgClass : theme === themeTypes.DARK ? "bg-gray-700" : "bg-gray-300",
         dropdownBgClass : theme === themeTypes.DARK ? "bg-gray-800" : "bg-white",
      
        //Label
        labelClass : theme === themeTypes.DARK ? "text-gray-200" : "text-gray-700",
        labelColor : theme === themeTypes.DARK ? "text-gray-200" : "text-gray-700",

        //Card
        cardBg :theme === themeTypes.DARK ? "bg-gray-800" : "bg-white",
        cardBorder : theme === themeTypes.DARK ? "border-gray-700" : "border-gray-100",
        cardSelected :theme === themeTypes.DARK? "border-purple-500 bg-purple-900": "border-purple-500 bg-purple-100",
     
     

        //File
        fileText : theme === themeTypes.DARK ? "text-blue-400" : "text-blue-600",

        //Form
        formBg : theme === themeTypes.DARK ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800",

        //Hover

     hoverClass : theme === themeTypes.DARK ? "hover:bg-gray-700" : "hover:bg-gray-100",
     tooltipClass : theme === themeTypes.DARK ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900",
      dropdownHoverClass : theme === themeTypes.DARK? "hover:bg-gray-700" : "hover:bg-gray-100",
     dropdownTextClass : theme === themeTypes.DARK ? "text-gray-200" : "text-gray-900",
     //Input
      inputTextClass : theme === themeTypes.DARK ? "text-gray-100" : "text-gray-900",
      inputPlaceholderClass :theme === themeTypes.DARK ? "placeholder-gray-400" : "placeholder-gray-500",
    inputBg : theme === themeTypes.DARK? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-gray-900",
  

    };
};
