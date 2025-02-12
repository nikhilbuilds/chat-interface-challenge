import { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ThemeContext = createContext({   
  darkMode: true,
  toggleDarkMode: () => {}
});

export const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#272727' : '#fff',
        paper: darkMode ? '#272727' : '#fff',
      },
    },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ToastContainer theme={darkMode ? "dark" : "light"} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
