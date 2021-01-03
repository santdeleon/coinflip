import React, { useState, createContext } from 'react';
import { oneOfType, array, object } from 'prop-types';
import { useWeb3React } from '@web3-react/core';

const propTypes = {
  children: oneOfType([array, object]),
};

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const { active } = useWeb3React();
  const [layout, setLayout] = useState({
    walletModal: {
      show: false,
      status: active ? 'connected' : 'not_connected',
      error: null,
      connectedWalletName: null,
    },
    accountModal: {
      show: false,
      isAddressCopied: false,
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
