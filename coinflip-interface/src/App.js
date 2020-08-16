import React, { useState, useEffect } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

import "./App.css";
import "./stylesheets/colors.css";
import "./stylesheets/buttons.css";

import CoinFlipContract from "./contracts/CoinFlip.json";

import { ContractProvider } from "./context/ContractContext";
import { UserProvider } from "./context/UserContext";
import { ApplicationProvider } from "./context/ApplicationContext";

import Layout from "./components/Layout";

import { useEagerConnect } from "./hooks/useEagerConnect";
import { getContractWithSigner } from "./utils/getContract";

const App = () => {
  const triedEager = useEagerConnect();
  const { active, account, chainId, library, error } = useWeb3React();

  // contract state
  const contract = getContractWithSigner(
    CoinFlipContract.networks[(chainId !== 1337 && chainId) || 5777].address,
    CoinFlipContract.abi,
    new Web3Provider(window.ethereum).getSigner()
  );
  const [contractOwner, setContractOwner] = useState("");
  const [contractBalance, setContractBalance] = useState("0");
  const contractState = {
    contract,
    contractAddress: contract.address,
    contractOwner,
    setContractOwner,
    contractBalance,
    setContractBalance,
  };

  // user state
  const [userBalance, setUserBalance] = useState("0");
  const userState = { userBalance, setUserBalance };

  // application state
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState("0");
  const [transactionResults, setTransactionResults] = useState(null);
  const [currentTab, setCurrentTab] = useState("Play");
  const [transactionButtonText, setTransactionButtonText] = useState(
    "Fund Contract"
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

  // if successfully connected to { injected } populate Contexts
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
