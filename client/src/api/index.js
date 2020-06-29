import { ethers } from "ethers";

import CoinFlipContract from "../contracts/CoinFlip.json";

import getWeb3 from "../components/getWeb3";

export default async () => {
  const provider = await getWeb3();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  const networkId = network.chainId.toString();
  const address = CoinFlipContract.networks[networkId].address;
  const abi = CoinFlipContract.abi;
  const contract = new ethers.Contract(address, abi, signer);
  const c = await contract.getContract();
  const owner = await contract.getContractOwner();
  const balance = parseFloat(ethers.utils.formatEther(c[1]));
  const accounts = await provider.listAccounts();
  const signerAddress = await signer.getAddress();
  const signerAddressBalance = ethers.utils.formatEther(
    await signer.getBalance()
  );

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
    // Credentials
    accounts: accounts,
    currentAddress: signerAddress,
    // TODO: Verify if isOwner dynamically
    isOwner: signerAddress === owner ? true : false,

    // TODO: Pull from blockchain on ethereum testnets
    // Game History
    // bets: [],
    // funds: [],
  };

  return [user, game];
};
