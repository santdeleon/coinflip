import { Web3Provider } from '@ethersproject/providers';

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};
