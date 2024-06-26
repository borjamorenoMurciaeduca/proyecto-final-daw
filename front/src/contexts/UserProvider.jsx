import { createContext, useState } from 'react';

export const UserContext = createContext();

/**
 * ESTADO GLOBAL CON LOS DATOS DEL USUARIO
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
