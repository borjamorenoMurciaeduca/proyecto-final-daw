import { useContext } from 'react';
import { AppDarkModeContext } from '../context/AppDarkModeProvider';

const useDarkMode = () => {
  const { darkMode, setDarkMode } = useContext(AppDarkModeContext);
  return { darkMode, setDarkMode };
};

export default useDarkMode;
