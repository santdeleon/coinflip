import React, { useState, createContext } from 'react';
import { oneOfType, array, object } from 'prop-types';

const propTypes = {
  children: oneOfType([array, object]),
};

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState({
    showConnectWalletModal: false,
    setShowConnectWalletModal: () => {},
    isWalletConnecting: false,
  });

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = propTypes;
export { LayoutProvider, LayoutContext };
