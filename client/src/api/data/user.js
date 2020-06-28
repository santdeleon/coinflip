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

  return {
    // Credentials
    provider: provider,
    accounts: accounts,
    signer: signer,
    currentAddress: signerAddress,
    addressBalance: signerAddressBalance,
    isOwner: signerAddress === accounts[0] && true,
    isUser: signerAddress !== accounts[0] && true,

    // TODO: Pull from blockchain on ethereum testnets
    // Game History
    // bets: [],
    // funds: [],
  };
};
