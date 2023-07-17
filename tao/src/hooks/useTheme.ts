import { useState } from "react";
import { AccentTheme, DarkTheme, LightTheme } from "../ThemeProvider";
const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  ACCENT: "accent",
};

const useTheme = () => {
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const themeToggler = () => {
    console.log("theme", theme);
    if (theme === THEMES.LIGHT) {
      setTheme(THEMES.DARK);
    } else if (theme === THEMES.DARK) {
      setTheme(THEMES.LIGHT);
    } else {
      setTheme(THEMES.LIGHT);
    }
  };
  return [theme, themeToggler];
};

export default useTheme;
