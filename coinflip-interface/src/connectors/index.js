import { InjectedConnector } from '@web3-react/injected-connector';

/**
 * TODO: Handle other connector types in the future
 */
export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337, 5777],
});
