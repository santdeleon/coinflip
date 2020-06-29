import { ethers } from "ethers";

import getWeb3 from "../../components/getWeb3";

export default async () => {
  const provider = await getWeb3();
  const accounts = await provider.listAccounts();
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const signerAddressBalance = ethers.utils.formatEther(
    await signer.getBalance()
  );
  console.log(provider);

  return {
    // Credentials
    accounts: accounts,
    currentAddress: signerAddress,
    // TODO: Verify if isOwner dynamincally
    isOwner: true,

    // TODO: Pull from blockchain on ethereum testnets
    // Game History
    // bets: [],
    // funds: [],
  };
};
