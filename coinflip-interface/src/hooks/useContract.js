import { useMemo } from "react";

import { getContract } from "../utils/getContract";

export const useContract = (address, abi, provider) => {
  return useMemo(() => {
    if (!address || !abi) return null;

    try {
      return getContract(address, abi, provider);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, abi, provider]);
};
