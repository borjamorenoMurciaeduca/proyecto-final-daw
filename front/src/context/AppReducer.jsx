export const AppReducer = (state, action) => {
  console.log('Action payload ->', action.payload);
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: { ...action.payload.user, token: action.payload.token },
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    case 'GET_VIVIENDAS_USUARIO':
      return {
        ...state,
        viviendasUsuario: action.payload,
      };
    default:
      return state;
  }
};
