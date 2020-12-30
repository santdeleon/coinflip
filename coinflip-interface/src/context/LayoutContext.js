import React, { useState, createContext } from 'react';
import { oneOfType, array, object } from 'prop-types';

const propTypes = {
  children: oneOfType([array, object]),
};

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState({
    walletModal: {
      show: false,
      status: 'idle',
      error: null,
      type: null,
    },
  });

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = propTypes;
export { LayoutProvider, LayoutContext };
