import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';

export const ColorThemeContext = createContext();

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
export const ColorThemeProvider = ({ children }) => {
  const colorModeSaved = window.localStorage.getItem('colorMode');
  const [mode, setMode] = useState(colorModeSaved || 'light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          window.localStorage.setItem('colorMode', newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );
  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //       },
  //     }),
  //   [mode]
  // );
  return (
    <ColorThemeContext.Provider value={{ colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorThemeContext.Provider>
  );
};
