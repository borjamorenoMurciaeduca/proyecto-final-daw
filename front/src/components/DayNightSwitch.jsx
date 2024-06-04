import useColorTheme from '@/hooks/useColorTheme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DayNightSwitch = () => {
  const { colorMode } = useColorTheme();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Tooltip title={t('tooltip.day-night-switch')}>
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
