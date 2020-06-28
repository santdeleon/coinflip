import { ethers } from "ethers";

const getWeb3 = async () => {
  // TODO: Use this conditional check when using ethereum testnets
  // if (window.ethereum) {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //
  //   try {
  //     await window.ethereum.enable();
  //     return provider;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  // // Legacy dapp browsers...
  // else if (window.provider) {
  //   // Use Mist/MetaMask's provider.
  //   const provider = window.provider;
  //   console.log("Injected provider detected.");
  //   return provider;
  // }
  // // Fallback to localhost;
  // else {
  //   const httpProvider = new Web3.providers.HttpProvider(
  //     "http://127.0.0.1:7545"
  //   );
  //   const provider = new ethers.providers.Web3Provider(httpProvider);
  //
  //   console.log("No provider instance injected, using Local provider.");
  //   return provider;
  // }

  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  return provider;
};

export default getWeb3;
