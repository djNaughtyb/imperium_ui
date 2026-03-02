export const getThemeClasses = (theme, isDarkMode) => {
  const baseClasses = {
    cosmic: {
      bg: bg-blue-900 text-blue-100,
      accent: text-blue-400,
      border: border-blue-800
    },
    noir: {
      bg: bg-gray-900 text-white,
      accent: text-yellow-300,
      border: border-gray-700
    },
    fantasy: {
      bg: bg-purple-900 text-purple-100,
      accent: text-purple-400,
      border: border-purple-800
    },
    manga: {
      bg: bg-black text-white,
      accent: text-red-500,
      border: border-red-700
    }
  };

  const themeConfig = baseClasses[theme] || baseClasses.cosmic;

  return {
    background: themeConfig.bg,
    accent: themeConfig.accent,
    border: themeConfig.border,
    darkMode: isDarkMode ? dark : 
  };
};
