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

  // const placeBet = async (e) => {
  //   const { web3, accounts, contract, contractAddress } = this.state;
  //   let { betAmount } = this.state;
  //   if (betAmount.match(/[a-zA-Z]/)) {
  //     this.setState({
  //       message:
  //         "Sorry, you can only bet with numbers! Check your bet amount.",
  //       showMessage: true,
  //     });
  //     return;
  //   } else if (betAmount > 5) {
  //     this.setState({
  //       message: "Sorry, you can't bet more than 5 ether.",
  //       showMessage: true,
  //     });
  //     return;
  //   } else if (betAmount === "0") {
  //     this.setState({
  //       message: "Sorry, you can't bet 0 ether",
  //       showMessage: true,
  //     });
  //     return;
  //   }
  //
  //   betAmount = web3.utils.toWei(betAmount, "ether");
  //
  //   if (
  //     parseInt(betAmount) > parseInt(await web3.eth.getBalance(contractAddress))
  //   ) {
  //     this.setState({
  //       message: "Sorry, you can't bet more than the contract balance.",
  //       showMessage: true,
  //     });
  //     return;
  //   }
  //
  //   let config = {
  //     from: accounts[0],
  //     value: betAmount,
  //   };
  //
  //   let oldUserBalance = await web3.utils.fromWei(
  //     await web3.eth.getBalance(accounts[0]),
  //     "ether"
  //   );
  //   let bet = await contract.methods.bet(betAmount).send(config);
  //   let results = bet.events.BetPlaced.returnValues;
  //   let newUserBalance = web3.utils.fromWei(
  //     await web3.eth.getBalance(accounts[0]),
  //     "ether"
  //   );
  //   let newContractBalance = web3.utils.fromWei(
  //     await web3.eth.getBalance(contractAddress),
  //     "ether"
  //   );
  //
  //   this.setState({
  //     betAmount: web3.utils.fromWei(betAmount, "ether"),
  //     betWon: results.betWon,
  //     gamblersAddress: results.gambler,
  //     userBalanceBeforeBet: oldUserBalance,
  //     userBalance: newUserBalance,
  //     message: "Bet successfully made.",
  //     showMessage: true,
  //     howMuchWasBet: web3.utils.fromWei(results.amount, "ether"),
  //     contractBalance: newContractBalance,
  //   });
  // };
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
