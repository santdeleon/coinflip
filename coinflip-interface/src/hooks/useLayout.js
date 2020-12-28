import { useContext } from 'react';

import { LayoutContext } from '../context/LayoutContext';

const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context)
    throw new Error('You must useLayout within a <LayoutProvider />');
  return context;
};

export default useLayout;
