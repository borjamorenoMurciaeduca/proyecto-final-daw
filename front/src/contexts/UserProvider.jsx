import { createContext, useState } from 'react';

export const UserContext = createContext();

/**
 * ESTADO GLOBAL CON LOS DATOS DEL USUARIO
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const setUpdateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};
