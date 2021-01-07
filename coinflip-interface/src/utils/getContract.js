import { Contract } from '@ethersproject/contracts';

export const getContract = (address, abi, providerOrSigner, account) => {
  if (!address || !abi || !providerOrSigner) return null;
  return new Contract(address, abi, providerOrSigner, account);
};
