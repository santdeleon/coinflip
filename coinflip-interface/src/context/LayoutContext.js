import React, { useEffect, useState, createContext } from 'react';
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
      status: 'not_connected',
      error: null,
      connectedWalletName: null,
    },
    accountModal: {
      show: false,
      isAddressCopied: false,
    },
  });

  useEffect(() => {
    if (active) {
      setLayout({
        walletModal: {
          connectedWalletName: 'metamask',
          status: 'connected',
        },
        accountModal: {
          show: false,
        },
      });
    }

    if (!active) {
      setLayout({
        walletModal: {
          show: false,
          status: 'not_connected',
        },
        accountModal: {
          show: false,
        },
      });
    }
  }, [active]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = propTypes;
export { LayoutProvider, LayoutContext };
