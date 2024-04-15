import { AppDarkModeContext } from './AppDarkModeContext';

export const AppDarkModeProvider = ({ children }) => { 
  const [darkMode, setDarkMode] = useState(false);
  return (
    <AppDarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </AppDarkModeContext.Provider>
  );
};
