import { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context)
    throw new Error('You must useLayout within a <LayoutProvider />');
  return context;
};
