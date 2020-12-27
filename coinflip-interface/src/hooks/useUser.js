import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

export const useTheme = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('You must useTheme within a <UserProvider />');
  return context;
};
