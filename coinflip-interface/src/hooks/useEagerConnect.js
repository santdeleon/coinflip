import { useState, useEffect, useRef } from 'react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';

import { injected } from '../connectors';

export const useEagerConnect = () => {
  let mounted = useRef(false);
  const [tried, setTried] = useState(false);
  const { activate, active } = useWeb3ReactCore(); // specifically using useWeb3ReactCore because of what this hook does

  useEffect(() => {
    injected &&
      activate(injected, undefined, true).catch(() => {
        setTried(true);
      });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation to flip the flag
  useEffect(() => {
    if (active && mounted.current) setTried(true);
    return () => (mounted.current = false);
  }, [active]);

  return tried;
};
