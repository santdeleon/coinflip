import { ethers } from "ethers";

const getWeb3 = async () => {
  let provider, signer;

  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    try {
      await window.ethereum.enable();
      return [provider, signer];
    } catch (error) {
      console.log(error);
      return error;
    }
  } else if (window.provider) {
    provider = window.provider;
    signer = provider.getSigner();
    return [provider, signer];
  } else {
    provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
    signer = provider.getSigner();
    return [provider, signer];
  }
};

export default getWeb3;
