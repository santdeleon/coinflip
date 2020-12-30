import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';

const getErrorMessage = (error) => {
  let errorMessage;

  if (error instanceof NoEthereumProviderError) {
    errorMessage =
      'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    errorMessage = "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    errorMessage =
      'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    errorMessage =
      'An unknown error occurred. Please refresh the page, or visit from another browser or device.';
  }

  return errorMessage;
};

export default getErrorMessage;
