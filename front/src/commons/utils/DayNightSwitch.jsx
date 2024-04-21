import useDarkMode from '@/hooks/useDarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';

const DayNightSwitch = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  // const { t } = useTranslation();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <IconButton onClick={toggleDarkMode}>
      {/* <Switch checked={darkMode} onChange={toggleDarkMode} /> */}
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default DayNightSwitch;
