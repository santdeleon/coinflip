import React, { useContext } from "react";

const initialState = {
  provider: {},
  signer: {},
  network: "",
  networkId: "",
  networkName: "yes",
  selectedAddress: "",
  owner: "",
  isOwner: false,
  userBalance: "",
};

const UserContext = React.createContext(initialState);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export const useUser = () => useContext(UserContext);
