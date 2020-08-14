import { Contract } from "@ethersproject/contracts";

export const getContract = (address, abi, provider) => {
  if (!address || !abi) return null;

  return new Contract(address, abi, provider);
};
