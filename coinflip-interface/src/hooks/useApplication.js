import { useContext } from 'react';

import { ApplicationContext } from '../context/ApplicationContext';

export const useTheme = () => {
  const context = useContext(ApplicationContext);
  if (!context)
    throw new Error('You must useTheme within a <ApplicationProvider />');
  return context;
};
