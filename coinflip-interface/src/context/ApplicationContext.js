import React, { useContext } from "react";

export const ApplicationContext = React.createContext({
  isWalletConnecting: false,
  setIsWalletconnecting: () => {},
  alert: null,
  setAlert: () => {},
  showModal: false,
  setShowModal: () => {},
  transactionAmount: "",
  setTransactionAmount: () => {},
  transactionButtonText: "",
  setTransactionButton: () => {},
  transactionResults: "",
  setTransactionResults: () => {},
  currentTab: "Play",
  setCurrentTab: () => {},
});

export const ApplicationProvider = ApplicationContext.Provider;
export const useApplication = () => useContext(ApplicationContext);
