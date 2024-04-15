import { createContext, useState } from 'react';

export const AppDarkModeContext = createContext();

export const AppDarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AppDarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </AppDarkModeContext.Provider>
  );
};
