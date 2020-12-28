import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../connectors';

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };

      /**
       * @dev: params chainId{string | number}
       */
      const handleChainChanged = (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };

      /**
       * @dev: params accounts{array}
       */
      const handleAccountsChanged = (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      /**
       * @dev: params networkId{string | number}
       */
      const handleNetworkChanged = (networkId) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}
