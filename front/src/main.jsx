import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppProvider.jsx';
import { AppDarkModeProvider } from './context/AppDarkModeContext';
import { createTheme } from "@mui/material";
import useDarkMode from "./hooks/useDarkMode.jsx"

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <AppDarkModeProvider>
        <AppWithTheme />
      </AppDarkModeProvider>
    </AppProvider>
  </StrictMode>
);

function AppWithTheme() {
  const { darkMode } = useDarkMode();

  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
