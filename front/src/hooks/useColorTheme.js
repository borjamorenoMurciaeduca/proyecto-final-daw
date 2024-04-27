import { ColorThemeContext } from '@/contexts/ColorThemeProvider';
import { useContext } from 'react';

const useColorTheme = () => {
  const { colorMode } = useContext(ColorThemeContext);
  if (!colorMode) {
    throw new Error(
      'useColorTheme debe ser utilizado dentro de un ColorThemeProvider'
    );
  }
  return { colorMode };
};

export default useColorTheme;
