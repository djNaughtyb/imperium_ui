import React, { createContext, useState, useMemo, useContext } from "react";
import { UNIVERSE_THEMES } from "../theme/universeThemes";

// Context
export const UniverseThemeContext = createContext();

// Provider
export function UniverseThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState("cosmic"); // or "default" if you add one

  const switchTheme = (themeName) => {
    if (UNIVERSE_THEMES[themeName]) {
      setActiveTheme(themeName);
    }
  };

  const currentTheme = useMemo(() => {
    return UNIVERSE_THEMES[activeTheme] || UNIVERSE_THEMES.cosmic;
  }, [activeTheme]);

  const value = {
    activeTheme,
    currentTheme,
    switchTheme,
  };

  return (
    <UniverseThemeContext.Provider value={value}>
      {children}
    </UniverseThemeContext.Provider>
  );
}

// Hook
export const useUniverseTheme = () => useContext(UniverseThemeContext);