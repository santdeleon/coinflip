import React, { useState, useEffect } from 'react';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';

import './App.css';
import './stylesheets/colors.css';
import './stylesheets/buttons.css';

import { ContractProvider } from './context/ContractContext';
import { UserProvider } from './context/UserContext';
import { ApplicationProvider } from './context/ApplicationContext';

import Layout from './components/Layout';

import { useEagerConnect } from './hooks/useEagerConnect';

const App = () => {
  const triedEager = useEagerConnect();
  const { active, account, chainId, library, contract } = useWeb3React();

  // if successfully connected to { injected } populate Contexts
  // TODO: Reduce amount of re-renders happening from data fetching
  console.log(transactionButtonText);
  useEffect(() => {
    if (triedEager && active) {
      const getContractOwner = async () => {
        setContractOwner(await contract.getContractOwner());
      };

      const getContractBalance = async () => {
        let balance = await contract.getContract();
        balance = parseFloat(formatEther(balance[1]));
        setContractBalance(balance);
      };

      getContractOwner();
      getContractBalance();
    }
  }, [triedEager, active, account, chainId, library, contract]);

  // TODO: Handle errors gracefully :(
  if (error) return <div>{error}</div>;

  return (
    <UserProvider value={userState}>
      <ContractProvider value={contractState}>
        <ApplicationProvider value={applicationState}>
          <div id="App" className="App">
            <div className="rainbow-top" />
            <Layout />
          </div>
        </ApplicationProvider>
      </ContractProvider>
    </UserProvider>
  );
};

export default App;
