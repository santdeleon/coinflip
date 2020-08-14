import React, { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

import "./App.css";
import "./stylesheets/colors.css";
import "./stylesheets/button.css";

import { ContractProvider } from "./context/ContractContext";
import { UserProvider } from "./context/UserContext";
import { ApplicationProvider } from "./context/ApplicationContext";

import Layout from "./components/Layout";

const App = () => {
  const userState = {};

  // contract state
  const [contractBalance, setContractBalance] = useState("");
  const [userIsConnected, setUserIsConnected] = useState(false);
  const contractState = {
    contractBalance,
    setContractBalance,
    userIsConnected,
    setUserIsConnected,
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

  const getLibrary = (provider) => new Web3Provider(provider);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  );
};

export default App;
