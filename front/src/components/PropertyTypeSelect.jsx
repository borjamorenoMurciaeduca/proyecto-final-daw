import { useEffect, useState, useCallback, useMemo } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PropertyTypeSelect = ({ propertyValue, onChange }) => {
  const { t } = useTranslation();
  const [selectedTypeProperty, setSelectedTypeProperty] = useState('');

  const typeProperties = useMemo(
    () => [
      { type_properties_id: 0, description: 'others' },
      { type_properties_id: 1, description: 'property' },
      { type_properties_id: 2, description: 'garage' },
    ],
    []
  );

  const findTypePropertyId = useCallback(
    (description) => {
      const typeProperty = typeProperties.find(
        (prop) => prop.description === description
      );
      return typeProperty ? typeProperty.type_properties_id : '';
    },
    [typeProperties]
  );

  useEffect(() => {
    if (propertyValue !== undefined) {
      const typePropertyId = findTypePropertyId(propertyValue);
      setSelectedTypeProperty(typePropertyId);
    }
  }, [propertyValue, findTypePropertyId]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedTypeProperty(newValue);
    const selectedProperty = typeProperties.find(
      (prop) => prop.type_properties_id === newValue
    );
    onChange({
      target: {
        name: 'type_property',
        value: selectedProperty ? selectedProperty.description : '',
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
