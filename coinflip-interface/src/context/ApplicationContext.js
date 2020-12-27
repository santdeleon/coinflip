import React, { useState, createContext } from 'react';
import { oneOfType, array, object } from 'prop-types';

const propTypes = {
  children: oneOfType([array, object]),
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [application, setApplication] = useState({
    isWalletConnecting: false,
    alert: null,
    showModal: false,
    transactionAmount: null,
    transactionResults: null,
    currentTab: '',
    transactionButtonText: '',
  });

  return (
    <UserContext.Provider value={{ application, setApplication }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = propTypes;
export { UserProvider, UserContext };
