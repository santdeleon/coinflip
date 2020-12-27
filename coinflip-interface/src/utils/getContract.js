import { Contract } from '@ethersproject/contracts';

// readonly
export const getContract = (address, abi, provider) => {
  if (!address || !abi || !provider) return null;
  return new Contract(address, abi, provider);
};

// read/write
export const getContractWithSigner = (address, abi, signer) => {
  if (!address || !abi || !signer) return null;
  return new Contract(address, abi, signer);
};
