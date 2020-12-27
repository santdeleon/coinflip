import React, { useState, createContext } from 'react';
import { oneOfType, array, object } from 'prop-types';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';

import CoinFlipContract from '../contracts/CoinFlip.json';

import { getContractWithSigner } from '../utils/getContract';

const propTypes = {
  children: oneOfType([array, object]),
};

const ContractContext = createContext();

const ContractProvider = ({ children }) => {
  const { chainId } = useWeb3React();

  // TODO: in the future we should handle contract for all networks
  const COINFLIP_CONTRACT = getContractWithSigner(
    CoinFlipContract.networks[(chainId !== 1337 && chainId) || 5777].address,
    CoinFlipContract.abi,
    new Web3Provider(window.ethereum).getSigner(),
  );

  const [contract, setContract] = useState({
    address: COINFLIP_CONTRACT.address,
    owner: null,
    balance: null,
  });

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};

ContractProvider.propTypes = propTypes;
export { ContractProvider, ContractContext };
