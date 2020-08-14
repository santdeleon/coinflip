import React, { useContext } from "react";

export const UserContext = React.createContext({
  network: "",
  chainId: "",
  setNetwork: () => {},
  userAddress: "",
  setUserAddress: () => {},
  isOwner: false,
  setIsOwner: () => {},
  userBalance: "",
  setUserBalance: () => {},
});

export const UserProvider = UserContext.Provider;
export const useUser = () => useContext(UserContext);
