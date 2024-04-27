import { DEFAULT_LANGUAGES, INIT_LANGUAGE } from '@/commons/config/config';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [lng, setLng] = useState(i18n.language ? i18n.language : INIT_LANGUAGE);

  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    setLng(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="select-language-autowidth-label">
        {t('languages.select-input')}
      </InputLabel>
      <Select
        labelId="select-language-autowidth-label"
        id="select-language-autowidth"
        value={lng}
        onChange={handleChangeLanguage}
        label={t('languages.select-input')}
      >
        {DEFAULT_LANGUAGES.map((language) => (
          <MenuItem key={language} value={language}>
            {t(`languages.${language.toLowerCase()}`)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
