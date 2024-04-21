import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import useDarkMode from './hooks/useDarkMode.js';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    navOr: {
      main: '#FFAD28',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    navOr: {
      main: '#FFAD28',
    },
  },
});

const AppWithTheme = () => {
  const { darkMode } = useDarkMode();
  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default AppWithTheme;
