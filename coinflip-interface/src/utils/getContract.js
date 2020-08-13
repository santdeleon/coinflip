import { Contract } from "@ethersproject/contracts";

export const getContract = (address, abi, provider) => {
  return new Contract(address, abi, provider);
};
