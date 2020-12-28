import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../connectors';

export function useEagerConnect() {
  const [tried, setTried] = useState(false);
  const { activate, active } = useWeb3React();

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        console.log('useEagerConnect v1');
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running once on mount

  // if the connection worked, wait until we get confirmation to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
      console.log('useEagerConnect v2');
    }
  }, [active]);

  return tried;
}
