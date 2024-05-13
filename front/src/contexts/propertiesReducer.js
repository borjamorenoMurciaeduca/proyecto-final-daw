export const propertiesReducer = (state, action) => {
  // console.log({
  //   state,
  //   type: action.type,
  //   payload: action.payload,
  // });
  switch (action.type) {
    case 'SET_PROPERTIES':
      return {
        ...state,
        properties: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        properties: [],
      };
    case 'ADD_PROPERTY':
      return {
        ...state,
        properties: [...state.properties, action.payload],
      };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map((el) =>
          el.property_id === action.payload.property_id
            ? (el = {
                ...el,
                ...action.payload,
              })
            : el
        ),
      };
    default:
      return state;
  }
};
