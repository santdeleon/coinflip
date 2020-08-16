import React, { useContext } from "react";

export const ContractContext = React.createContext({
  contract: {},
  contractAddress: "",
  contractOwner: "",
  setContractOwner: () => {},
  contractBalance: "",
  setContractBalance: () => {},
});

export const ContractProvider = ContractContext.Provider;
export const useContract = () => useContext(ContractContext);
