import React, { useEffect, useState, createContext, useContext } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import { useWeb3React } from '@web3-react/core';

export const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
  const { active } = useWeb3React();
  const [walletModal, setWalletModal] = useState({
    show: false,
    status: 'not_connected',
    error: null,
    connectedWalletName: null,
  });
  const [accountModal, setAccountModal] = useState({
    show: false,
    isAddressCopied: false,
  });

  useEffect(() => {
    if (active) {
      setWalletModal({
        connectedWalletName: 'metamask',
        status: 'connected',
      });
      setAccountModal({
        show: false,
      });
    }

    if (!active) {
      setWalletModal({
        show: false,
        status: 'not_connected',
      });
      setAccountModal({
        show: false,
      });
    }
  }, [active]);

  return (
    <LayoutContext.Provider
      value={{ accountModal, setAccountModal, walletModal, setWalletModal }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = { children: oneOfType([arrayOf(node), node]) };
export default LayoutProvider;
