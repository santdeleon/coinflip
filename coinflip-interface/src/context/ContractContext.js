import React, { useContext } from "react";

const initialState = {
  contract: "",
  contractAddress: "",
  contractBalance: "",
  isConnected: false,
  setIsConnected: () => {},
};

const ContractContext = React.createContext(initialState);

export const ContractProvider = ContractContext.Provider;
export const ContractConsumer = ContractContext.Consumer;
export const useContract = () => useContext(ContractContext);
