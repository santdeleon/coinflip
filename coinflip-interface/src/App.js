import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import "./App.css";
import "./stylesheets/colors.css";
import "./stylesheets/buttons.css";

import { ContractProvider } from "./context/ContractContext";
import { UserProvider } from "./context/UserContext";
import { ApplicationProvider } from "./context/ApplicationContext";

import Layout from "./components/Layout";

import { useEagerConnect } from "./hooks/useEagerConnect";
import { useContract } from "./context/ContractContext";

const App = () => {
  // user state
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentChainId, setCurrentChainId] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [network, setNetwork] = useState(null);
  const userState = {
    currentAddress,
    setCurrentAddress,
    currentChainId,
    setCurrentChainId,
    network,
    setNetwork,
    userBalance,
    setUserBalance,
  };

  // contract state
  const { contract } = useContract();
  const [contractBalance, setContractBalance] = useState("0");
  const contractState = {
    contractBalance,
    setContractBalance,
  };

  // application state
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState("0");
  const [transactionResults, setTransactionResults] = useState(null);
  const [currentTab, setCurrentTab] = useState("Play");
  const [transactionButtonText, setTransactionButtonText] = useState(
    "Connect to a Wallet"
  );
  const applicationState = {
    isWalletConnecting,
    setIsWalletConnecting,
    alert,
    setAlert,
    showModal,
    setShowModal,
    transactionAmount,
    setTransactionAmount,
    transactionResults,
    setTransactionResults,
    currentTab,
    setCurrentTab,
    transactionButtonText,
    setTransactionButtonText,
  };

  const triedEager = useEagerConnect();
  const { active, account, chainId, library } = useWeb3React();

  // if successfully connected to { injected } populate Contexts
  useEffect(() => {
    if (triedEager && active) {
      const getBalance = async () => {
        const balance = await contract.getBalance();
        setContractBalance(balance);
        setNetwork(
          library.network.name === "unknown" ? "Ganache" : library.network.name
        );
      };

      setCurrentAddress(account);
      setCurrentChainId(chainId);

      getBalance();
    }
  }, [triedEager, active, account, chainId, contract, library]);

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
