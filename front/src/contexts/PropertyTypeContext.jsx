import React, { createContext, useState, useEffect } from 'react';
import typePropertiesService from '@/services/typePropertiesService';

export const PropertyTypeContext = createContext();

export const PropertyTypeProvider = ({ children }) => {
  const [typeProperties, setTypeProperties] = useState([]);

  useEffect(() => {
    const fetchTypeProperties = async () => {
      try {
        const response = await typePropertiesService.getAllTypeProperties();
        //console.log(response.data);
        setTypeProperties(response.data);
      } catch (error) {
        console.error('Error fetching type properties:', error);
      }
    };

    fetchTypeProperties();
  }, [typeProperties]);

  return (
    <PropertyTypeContext.Provider value={{ typeProperties, setTypeProperties }}>
      {children}
    </PropertyTypeContext.Provider>
  );
};
