import { Switch } from "@mui/material";
import { AppDarkModeContext } from "../../context/AppDarkModeContext";
import { useContext } from "react";
import { useTranslation } from 'react-i18next';

const DayNightSwitch = () => {
  const { darkMode, setDarkMode } = useContext(AppDarkModeContext);
  const { t } = useTranslation();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
      <span>{darkMode ? t('theme-mode.dark') : t('theme-mode.light')}</span>
    </div>
  );
};

export default DayNightSwitch;
