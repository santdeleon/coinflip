import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import { useWeb3React } from '@web3-react/core';

import { getContract } from '../utils';

import COINFLIP_CONTRACT from '../contracts/CoinFlip.json';

export const ContractContext = createContext();

export const useContract = () => useContext(ContractContext);

export const ContractProvider = ({ children }) => {
  const { active, library } = useWeb3React();
  const [contract, setContract] = useState(null);

  const connectToSmartContract = useCallback(async () => {
    const contract = getContract(
      COINFLIP_CONTRACT.networks['5777'].address,
      COINFLIP_CONTRACT.abi,
      library.getSigner(),
    );
    setContract(contract);
  }, [library]);

  useEffect(() => {
    if (active) connectToSmartContract();
  }, [active, connectToSmartContract]);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};

ContractProvider.propTypes = { children: oneOfType([arrayOf(node), node]) };
export default ContractProvider;
