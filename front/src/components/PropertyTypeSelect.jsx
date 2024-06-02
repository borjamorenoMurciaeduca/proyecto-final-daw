import React, { useEffect, useState, useContext } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PropertyTypeContext } from '@/contexts/PropertyTypeContext';

const PropertyTypeSelect = ({ propertyValue, onChange }) => {
  const { t } = useTranslation();
  const { typeProperties } = useContext(PropertyTypeContext);

  const findTypePropertyId = (description) => {
    const typeProperty = typeProperties.find(
      (prop) => prop.description === description
    );
    return typeProperty ? typeProperty.type_properties_id : '';
  };

  const [selectedTypeProperty, setSelectedTypeProperty] = useState(
    findTypePropertyId(propertyValue)
  );

  useEffect(() => {
    if (propertyValue !== undefined) {
      const typePropertyId = findTypePropertyId(propertyValue);
      if (typePropertyId !== selectedTypeProperty) {
        setSelectedTypeProperty(typePropertyId);
      }
    }
  }, [propertyValue, typeProperties]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedTypeProperty(newValue);
    onChange({
      target: {
        name: 'type_property',
        value: typeProperties[newValue].description,
      },
    });
  };

  return (
    <TextField
      select
      fullWidth
      label={t('add-property-form.type_property')}
      value={selectedTypeProperty}
      onChange={handleChange}
    >
      {typeProperties.map((option) => (
        <MenuItem
          key={option.type_properties_id}
          value={option.type_properties_id}
        >
          {t(`select-type-property.${option.description}`)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PropertyTypeSelect;
