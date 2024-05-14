import { PropertiesContext } from "@/contexts/PropertiesProvider";
import { useContext } from "react";

const useProperties = () => {
  const {
    state,
    setProperties,
    removeNote,
    addNote,
    addProperty,
    handleLogout,
    updateProperty,
    changeFavoriteProperty,
  } = useContext(PropertiesContext);
  return {
    state,
    properties: state.properties,
    setProperties,
    removeNote,
    addNote,
    addProperty,
    handleLogout,
    updateProperty,
    changeFavoriteProperty,
  };
};
export default useProperties;
