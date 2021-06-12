import React, { useState, createContext, useContext } from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';

export const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        showAccountModal,
        setShowAccountModal,
        showWalletModal,
        setShowWalletModal,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = { children: oneOfType([arrayOf(node), node]) };
export default LayoutProvider;
