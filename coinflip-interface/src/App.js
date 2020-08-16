import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

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
  const [userIsOwner, setUserIsOwner] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentChainId, setCurrentChainId] = useState(null);
  const [userBalance, setUserBalance] = useState("0");
  const [network, setNetwork] = useState(null);
  const userState = {
    userIsOwner,
    setUserIsOwner,
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
  const [contractOwner, setContractOwner] = useState(null);
  const [contractBalance, setContractBalance] = useState("0");
  const contractState = {
    contract,
    contractAddress: contract.address,
    contractOwner,
    setContractOwner,
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
  const { active, account, chainId, library, error } = useWeb3React();

  // if successfully connected to { injected } populate Contexts
  useEffect(() => {
    if (triedEager && active) {
      // get contract owner
      const getOwner = async () => {
        const owner = await contract.getContractOwner();
        setContractOwner(owner);
        setUserIsOwner(owner === currentAddress ? true : false);
      };

      // get contract balance
      const getBalance = async () => {
        let balance = await contract.getContract();
        balance = parseFloat(formatEther(balance[1]));
        setContractBalance(balance);
        setNetwork(
          library.network.name === "unknown" ? "Ganache" : library.network.name
        );
      };

      setCurrentAddress(account);
      setCurrentChainId(chainId);
      setTransactionButtonText("Fund Contract");
      getOwner();
      getBalance();
    }
  }, [triedEager, active, account, chainId, contract, library, currentAddress]);

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
