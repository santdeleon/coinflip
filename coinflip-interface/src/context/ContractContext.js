import React, { useContext } from "react";
import { Web3Provider } from "@ethersproject/providers";

import CoinFlipContract from "../contracts/CoinFlip.json";
import { getContract } from "../utils/getContract";

const contract = getContract(
  CoinFlipContract.networks[5777].address,
  CoinFlipContract.abi,
  new Web3Provider(window.ethereum)
);

export const ContractContext = React.createContext({
  contract,
  contractAddress: contract.address,
  contractBalance: "",
  setContractBalance: () => {},
  userIsConnected: false,
  setUserIsConnected: () => {},
});

export const ContractProvider = ContractContext.Provider;
export const useContract = () => useContext(ContractContext);
