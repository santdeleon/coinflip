import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { oneOfType, array, object } from 'prop-types';

import { useEagerConnect, useInactiveListener } from '../hooks';
import { getErrorMessage } from '../utils';

import Message from './Message';

const propTypes = {
  children: oneOfType([array, object]),
};

const Web3ReactManager = ({ children }) => {
  const { activate, active, error } = useWeb3React();
  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !active && !error) {
      console.log(
        "Eager connection failed. It's probably because MetaMask is not authorized",
      );
    }
  }, [triedEager, active, error, activate]);

  // when account becomes inactive, try to login
  useInactiveListener(!triedEager);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) return null;

  if (!active && error)
    return (
      <Message
        message={getErrorMessage(error)}
        isError={true}
        showToast={true}
      />
    );

  // connection successful
  if (triedEager && active) return children;

  // fallback -- connection unsuccessful and no errors, render nothing
  return null;
};

Web3ReactManager.propTypes = propTypes;
export default Web3ReactManager;
