import useColorTheme from '@/hooks/useColorTheme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Tooltip, useTheme } from '@mui/material';

const DayNightSwitch = () => {
  const { colorMode } = useColorTheme();
  const theme = useTheme();

  return (
    <Tooltip title="Cambiar tema">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default DayNightSwitch;
