import { ethers } from "ethers";

import CoinFlipContract from "../../contracts/CoinFlip.json";

import getWeb3 from "../../components/getWeb3";

export default async () => {
  const provider = await getWeb3();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  const networkId = network.chainId.toString();
  const address = CoinFlipContract.networks[networkId].address;
  const abi = CoinFlipContract.abi;
  const contract = new ethers.Contract(address, abi, signer);
  const balance = parseFloat(
    ethers.utils.formatEther(await contract.getBalance(address))
  );
  const owner = await contract.getOwner();

  return {
    // Contract
    contract,
    contractAddress: contract.address,
    contractBalance: balance,
    owner: owner[0],

    // UI
    tabs: [
      { id: 0, name: "Play" },
      { id: 1, name: "Results" },
      { id: 2, name: "Rules" },
      { id: 3, name: "Withdraw" },
    ],
  };
};
