export const AppReducer = (state, action) => {
  console.log('Action payload ->', action.payload);
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        usuarioInmuebles: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        usuarioInmuebles: [],
      };
    case 'GET_VIVIENDAS_USUARIO':
      return {
        ...state,
        usuarioInmuebles: action.payload,
      };
    case 'ADD_VIVIENDA':
      return {
        ...state,
        usuarioInmuebles: [...state.usuarioInmuebles, action.payload],
      };
    default:
      return state;
  }
};
