export const viviendasReducer = (state, action) => {
  // console.log({
  //   state,
  //   type: action.type,
  //   payload: action.payload,
  // });
  switch (action.type) {
    case 'SET_VIVIENDAS_USUARIO':
      return {
        ...state,
        properties: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        properties: [],
      };
    case 'ADD_VIVIENDA':
      return {
        ...state,
        properties: [...state.properties, action.payload],
      };
    default:
      return state;
  }
};
