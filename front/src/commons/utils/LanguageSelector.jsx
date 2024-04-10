import { React, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { DEFAULT_LANGUAGES } from "../config/config";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [anchorElI18N, setAnchorElI18N] = useState(null);

  const handleOpenI18NMenu = (event) => setAnchorElI18N(event.currentTarget);
  const handleCloseI18NMenu = () => setAnchorElI18N(null);

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleCloseI18NMenu();
  };

  const getLanguageFlag = (lng, size = 24, isMain = false) => {
    const iconUrl = `languages/icons/${lng}.png`;

    return (
      <img
        src={iconUrl}
        alt={lng}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          marginRight: `${isMain ? `0px` : `8px`}`,
        }}
      />
    );
  };

  return (
    <div>
      <Tooltip title={t("tooltip.change-language")}>
        <IconButton onClick={handleOpenI18NMenu} sx={{ p: 0 }}>
          {getLanguageFlag(i18n.language, 38, true)}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElI18N}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElI18N)}
        onClose={handleCloseI18NMenu}
      >
        {DEFAULT_LANGUAGES.map((language) => (
          <MenuItem
            key={language}
            onClick={() => handleChangeLanguage(`${language.toLowerCase()}`)}
          >
            {getLanguageFlag(`${language.toLowerCase()}`)}{" "}
            {t(`languages.${language.toLowerCase()}`)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
