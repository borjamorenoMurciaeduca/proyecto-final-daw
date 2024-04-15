import { useContext } from 'react';
import { AppDarkModeContext } from "../context/AppDarkModeContext";

const useModos = () => {
  const {darkMode, setDarkMode} = useContext(AppDarkModeContext);
  return { darkMode, setDarkMode };
};

export default useModos;
