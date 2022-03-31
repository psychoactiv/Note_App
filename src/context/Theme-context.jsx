import { useContext, createContext, useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const UserPreferredTheme = useMediaPredicate(`(prefers-color-scheme: dark)`)
    ? "dark"
    : "light";
  const [theme, setTheme] = useState({
    decideTheme: localStorage.getItem("userTheme") || UserPreferredTheme,
  });

  useEffect(() => {
    localStorage.setItem("userTheme", theme.decideTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
