import React, { createContext, useState, useMemo, useContext } from "react";
import { universeThemes } from "../theme/universeThemes";

// Context
export const UniverseThemeContext = createContext();

// Provider
export function UniverseThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState("default");

  // Future: Primus/Zero/C++ agent can override themes here
  const switchTheme = (themeName) => {
    if (universeThemes[themeName]) {
      setActiveTheme(themeName);
    }
  };

  // Memoized theme object
  const currentTheme = useMemo(() => {
    return universeThemes[activeTheme] || universeThemes.default;
  }, [activeTheme]);

  const value = {
    activeTheme,
    currentTheme,
    switchTheme,

    // Future expansion ports:
    // setMood: (mood) => {},
    // setDynamicWallpaper: (url) => {},
    // applyAgentTheme: (agentPayload) => {},
  };

  return (
    <UniverseThemeContext.Provider value={value}>
      {children}
    </UniverseThemeContext.Provider>
  );
}

// Hook
export const useUniverseTheme = () => useContext(UniverseThemeContext);
