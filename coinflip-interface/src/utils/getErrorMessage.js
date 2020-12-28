import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';

export const getErrorMessage = (error) => {
  let errorMessage;

  switch (error) {
    case error instanceof NoEthereumProviderError:
      errorMessage =
        'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
      break;

    case error instanceof UnsupportedChainIdError:
      errorMessage = "You're connected to an unsupported network.";
      break;

    case error instanceof UserRejectedRequestErrorInjected ||
      error instanceof UserRejectedRequestErrorWalletConnect ||
      error instanceof UserRejectedRequestErrorFrame:
      errorMessage =
        'Please authorize this website to access your Ethereum account.';
      break;

    default:
      console.error(error);
      errorMessage =
        'An unknown error occurred. Check the console for more details.';
      break;
  }

  return errorMessage;
};
