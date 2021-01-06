import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error('You must useTransaction within a <TransactionProvider />');
  return context;
};
