import { useContext } from 'react';

import { ContractContext } from '../context/ContractContext';

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context)
    throw new Error('You must useContract within a <ContractProvider />');
  return context;
};
