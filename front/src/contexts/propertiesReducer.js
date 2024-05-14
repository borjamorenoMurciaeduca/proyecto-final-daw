export const propertiesReducer = (state, action) => {
  // console.log({
  //   state,
  //   type: action.type,
  //   payload: action.payload,
  // });
  switch (action.type) {
    case "SET_PROPERTIES":
      return {
        ...state,
        properties: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        properties: [],
      };
    case 'REMOVE_NOTE':
      const noteIdToRemove = action.payload;
      const updatedProperties = state.properties.map(property => {
        if (property.notes && property.notes.length > 0) {
          const updatedNotes = property.notes.filter(note => note.id !== noteIdToRemove);
          return {
            ...property,
            notes: updatedNotes,
          };
        } else {
          return property;
        }
      });
      return {
        ...state,
        properties: updatedProperties,
      };
    case 'ADD_NOTE':
      const newNote = action.payload;
      const propertyIdToAddNote = newNote.property_id;
      const updatedPropertiesWithNewNote = state.properties.map(property => {
        if (property.property_id === propertyIdToAddNote) {
          return {
            ...property,
            notes: [...property.notes, newNote],
          };
        } else {
          return property;
        }
      });
      return {
        ...state,
        properties: updatedPropertiesWithNewNote,
      };
    case "ADD_PROPERTY":
      return {
        ...state,
        properties: [...state.properties, action.payload],
      };
    case "UPDATE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((el) =>
          el.property_id == action.payload.property_id
            ? (el = {
              ...el,
              ...action.payload,
            })
            : el,
        ),
      };
    case "CHANGE_FAVORITE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map((el) =>
          el.property_id == action.payload.property_id
            ? (el = {
              ...el,
              favorite: action.payload.favorite,
            })
            : el,
        ),
      };
    default:
      return state;
  }
};