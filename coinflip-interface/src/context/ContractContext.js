import React, { useContext } from "react";
import { Web3Provider } from "@ethersproject/providers";

import CoinFlipContract from "../contracts/CoinFlip.json";

import { getContract } from "../utils/getContract";

const contract = getContract(
  CoinFlipContract.networks[5777].address,
  CoinFlipContract.abi,
  new Web3Provider(window.ethereum).getSigner()
);

export const ContractContext = React.createContext({
  contract: contract,
  setContract: () => {},
  contractAddress: contract.address,
  setContractAddress: () => {},
  contractOwner: "",
  setContractOwner: () => {},
  contractBalance: "",
  setContractBalance: () => {},
});

export const ContractProvider = ContractContext.Provider;
export const useContract = () => useContext(ContractContext);
