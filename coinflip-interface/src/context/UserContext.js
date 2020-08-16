import React, { useContext } from "react";

export const UserContext = React.createContext({
  userBalance: "",
  setUserBalance: () => {},
});

export const UserProvider = UserContext.Provider;
export const useUser = () => useContext(UserContext);
