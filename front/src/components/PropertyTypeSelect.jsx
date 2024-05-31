import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import typePropertiesService from '@/services/typePropertiesService';

const PropertyTypeSelect = ({ propertyValue }) => {
  const [typeProperties, setTypeProperties] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTypeProperties = async () => {
      try {
        const response = await typePropertiesService.getAllTypeProperties();
        setTypeProperties(response.data);
      } catch (error) {
        console.error('Error fetching type properties:', error);
      }
    };

    fetchTypeProperties();
  }, []);

  return (
    <TextField
      id="outlined-select-type_property"
      select
      fullWidth
      label={t('add-property-form.type_property')}
      defaultValue={propertyValue.type_property}
    >
      {typeProperties.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {t(`select-type-property.${option.description}`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PropertyTypeSelect;
