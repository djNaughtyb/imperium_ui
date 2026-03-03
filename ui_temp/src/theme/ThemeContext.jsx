import { createContext, useState, useContext, PropsWithChildren } from react;

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("cosmic");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    setIsDarkMode(newTheme === "noir");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeProvider, useThemeContext };
