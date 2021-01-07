import { Web3Provider } from '@ethersproject/providers';

export const getLibrary = (provider, connector) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};
