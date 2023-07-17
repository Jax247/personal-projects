import React, { useState, createContext, useContext } from "react";
import styled, {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";

export interface ThemePalette {
  primary: string;
  secondary: string;
  background: {
    default: string;
    paper: string;
  };
  grey: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
  };
  custom: {
    main: string;
  };
}

// Define the theme options for each color scheme
const LightTheme: ThemePalette = {
  primary: "#ffffff",
  secondary: "#000000",
  background: {
    default: "#ffffff",
    paper: "#f5f5f5",
  },
  grey: {
    50: "#f5f5f5",
    100: "#eeeeee",
    200: "#e0e0e0",
    300: "#bdbdbd",
    400: "#9e9e9e",
    500: "#757575",
    600: "#616161",
    700: "#424242",
    800: "#212121",
    900: "#000000",
    A100: "#ffffff",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
  },
  custom: {
    main: "#3f51b5",
  },
};

const DarkTheme: ThemePalette = {
  primary: "#000000",
  secondary: "#FCF6F4",
  background: {
    default: "#000000",
    paper: "#212121",
  },
  grey: {
    50: "#f5f5f5",
    100: "#eeeeee",
    200: "#e0e0e0",
    300: "#bdbdbd",
    400: "#9e9e9e",
    500: "#757575",
    600: "#616161",
    700: "#424242",
    800: "#212121",
    900: "#000000",
    A100: "#ffffff",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
  },
  custom: {
    main: "#ff9800",
  },
};

const AccentTheme: ThemePalette = {
  primary: "#2196f3",
  secondary: "#ffffff",
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  grey: {
    50: "#f5f5f5",
    100: "#eeeeee",
    200: "#e0e0e0",
    300: "#bdbdbd",
    400: "#9e9e9e",
    500: "#757575",
    600: "#616161",
    700: "#424242",
    800: "#212121",
    900: "#000000",
    A100: "#ffffff",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161",
  },
  custom: {
    main: "#4caf50",
  },
};

// Define types for the context provider value
interface ThemeContextProps {
  theme: ThemePalette;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: DarkTheme,
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemePalette>(LightTheme);

  const toggleTheme = () => {
    console.log("theme", theme);
    if (theme === LightTheme) {
      setTheme(DarkTheme);
    } else if (theme === DarkTheme) {
      setTheme(AccentTheme);
    } else {
      setTheme(LightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useToggleTheme();

  return (
    <ThemeContextProvider>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContextProvider>
  );
};

export const useToggleTheme = () => useContext(ThemeContext);

// You can also use these breakpoints after importing it and use it as breakpoints.sm
export const breakpoints = {
  sm: 20, //em
  md: 30,
  lg: 45,
  xl: 60,
  xxl: 75,
};

export const mediaQueries = (key: number) => {
  return (style:TemplateStringsArray) => `@media (max-width: ${key}em) { ${style} }`;
};


export { LightTheme, DarkTheme, AccentTheme };
