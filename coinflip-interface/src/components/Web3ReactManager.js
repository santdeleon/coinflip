import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { oneOfType, array, object, string, func } from 'prop-types';
import { useEagerConnect, useInactiveListener } from '../hooks';
import { getErrorMessage } from '../utils';

const propTypes = {
  children: oneOfType([array, object, string, func]),
};

const Web3ReactManager = ({ children }) => {
  const { activate, active, error } = useWeb3React();
  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !active && !error) {
      return; // TODO: eventually this should try to establish connection to a network
    }
  }, [triedEager, active, error, activate]);

  // when account becomes inactive, try to login
  useInactiveListener(!triedEager);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) return null;

  if (!active && error) {
    console.log(getErrorMessage(error));
    return <p>{getErrorMessage(error)}</p>;
  }

  // connection successful
  if (triedEager && active) return children;

  // fallback -- connection unsuccessful and no errors, render nothing
  return null;
};

Web3ReactManager.propTypes = propTypes;
export default Web3ReactManager;
