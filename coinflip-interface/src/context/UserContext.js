import React, { useContext } from "react";

export const UserContext = React.createContext({
  currentAddress: "",
  setCurrentAddress: () => {},
  currentChainId: "",
  setCurrentChainId: () => {},
  network: "",
  setNetwork: () => {},
  userBalance: "",
  setUserBalance: () => {},
});

export const UserProvider = UserContext.Provider;
export const useUser = () => useContext(UserContext);
