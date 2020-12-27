import { useContext } from 'react';

import { ContractContext } from '../context/ContractContext';

export const useTheme = () => {
  const context = useContext(ContractContext);
  if (!context)
    throw new Error('You must useTheme within a <ContractProvider />');
  return context;
};
