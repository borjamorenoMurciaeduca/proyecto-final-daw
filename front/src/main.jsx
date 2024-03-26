import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProvider } from './context/AppProvider.jsx';
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppProvider>
  </StrictMode>
);
