import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { injected } from '../connectors';

import { useEagerConnect, useInactiveListener } from '../hooks';

const Web3ReactManager = ({ children }) => {
  const { active } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React();

  // try to eagerly connect to injected provider if it exists and has granted access already
  const triedEager = useEagerConnect();

  // if network is ever not connected, attempt to eagerly connect again
  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(injected);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // handle delayed loader state
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) return null;

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) return <div>unknown error</div>;

  // if neither context is active, spin
  if (!active && !networkActive)
    return showLoader ? <div>loading...</div> : null;

  return children;
};

export default Web3ReactManager;
