import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

import api from "./api";

import Layout from "./components/Layout";
import Loader from "./components/Loader";

import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    user: { currentAddress: "" },
    game: { contractBalance: 0 },
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await api.user();
      const game = await api.game();

      setData({ user, game });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  //
  // const withdrawOneEther = async (e) => {
  //   const {
  //     web3,
  //     contract,
  //     accounts,
  //     contractAddress,
  //     contractBalance,
  //   } = this.state;
  //   let withdrawalAmount = web3.utils.toWei("1", "ether");
  //
  //   if (contractBalance <= 0) {
  //     this.setState({
  //       message: "Sorry, there are no funds to withdraw.",
  //       showMessage: true,
  //     });
  //     return;
  //   }
  //
  //   if (contractBalance < withdrawalAmount && contractBalance > 0) {
  //     withdrawalAmount = web3.utils.toWei(contractBalance, "ether");
  //   }
  //
  //   await contract.methods
  //     .withdraw(withdrawalAmount)
  //     .send({ from: accounts[0] });
  //   let balance = await web3.eth.getBalance(contractAddress);
  //   this.setState({
  //     contractBalance: web3.utils.fromWei(balance, "ether"),
  //     message: `Your account ${accounts[0]} now has ${web3.utils.fromWei(
  //       withdrawalAmount,
  //       "ether"
  //     )} more ether.`,
  //     showMessage: true,
  //   });
  // };
  //
  // const withdrawAllEther = async (e) => {
  //   const {
  //     web3,
  //     contract,
  //     accounts,
  //     contractAddress,
  //     contractBalance,
  //   } = this.state;
  //   if (contractBalance <= 0) {
  //     this.setState({
  //       message: "Sorry, there are no funds to withdraw.",
  //       showMessage: true,
  //     });
  //     return;
  //   }
  //   let balanceBefore = contractBalance;
  //   await contract.methods.withdrawAll().send({ from: accounts[0] });
  //   let balanceAfter = await web3.eth.getBalance(contractAddress);
  //   this.setState({
  //     contractBalance: web3.utils.fromWei(balanceAfter, "ether"),
  //     message: `Your account ${accounts[0]} now has ${balanceBefore} more ether.`,
  //     showMessage: true,
  //   });
  // };
  //

  if (isLoading) return <Loader />;

  return (
    <div className="App">
      <div className="rainbow-top" />

      <Layout
        user={data.user}
        game={data.game}
        message={message}
        setMessage={setMessage}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
        // withdrawOneEther={withdrawOneEther}
        // withdrawAllEther={withdrawAllEther}
        // placeBet={placeBet}
      />
    </div>
  );
};

export default App;
