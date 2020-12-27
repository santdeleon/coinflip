import React, { useState, createContext } from 'react';
import { oneOfType, array, object } from 'prop-types';

const propTypes = {
  children: oneOfType([array, object]),
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    address: null,
    balance: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = propTypes;
export { UserProvider, UserContext };
