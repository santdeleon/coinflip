import { ethers } from "ethers";

import CoinFlipContract from "../contracts/CoinFlip.json";

import getWeb3 from "../components/getWeb3";

export default async () => {
  // web3
  const web3 = await getWeb3();
  const provider = web3[0];
  const signer = web3[1];

  // contract
  const network = await provider.getNetwork();
  const networkId = network.chainId.toString();
  const contract = new ethers.Contract(
    CoinFlipContract.networks[networkId].address,
    CoinFlipContract.abi,
    signer
  );
  const c = await contract.getContract();
  const owner = await contract.getContractOwner();
  const balance = parseFloat(ethers.utils.formatEther(c[1]));

  // user
  const selectedAddress = await signer.getAddress();

  const game = {
    // Contract
    contract,
    contractAddress: contract.address,
    contractBalance: balance,
    owner,

    // UI
    tabs: [
      { id: 0, name: "Play" },
      { id: 1, name: "Results" },
      { id: 2, name: "Rules" },
      { id: 3, name: "Withdraw" },
    ],
  };

  const user = {
    selectedAddress,
    isOwner: selectedAddress === owner ? true : false,
  };

  return [user, game];
};
