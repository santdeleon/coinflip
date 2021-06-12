import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { oneOfType, arrayOf, node } from 'prop-types';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from '@ethersproject/units';

import { getContract } from '../utils';

import COINFLIP_CONTRACT from '../contracts/CoinFlip.json';

export const ContractContext = createContext();

export const useContract = () => useContext(ContractContext);

export const ContractProvider = ({ children }) => {
  const { active, library } = useWeb3React();
  const [contract, setContract] = useState({
    contract: null,
    address: null,
    balance: '',
    owner: null,
  });

  const connectToSmartContract = useCallback(async () => {
    const contract = getContract(
      COINFLIP_CONTRACT.networks['5777'].address,
      COINFLIP_CONTRACT.abi,
      library.getSigner(),
    );
    const rawContractBalance = await contract.balances(contract.address);
    const owner = await contract.getContractOwner();

    setContract({
      contract,
      address: COINFLIP_CONTRACT.networks['5777'].address,
      balance: formatEther(rawContractBalance),
      owner,
    });
  }, [library]);

  useEffect(() => {
    if (active) {
      connectToSmartContract();
    }
  }, [active, connectToSmartContract]);

  return (
    <ContractContext.Provider value={{ ...contract }}>
      {children}
    </ContractContext.Provider>
  );
};

ContractProvider.propTypes = { children: oneOfType([arrayOf(node), node]) };
export default ContractProvider;
