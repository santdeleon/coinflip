import React, { useState, useEffect } from "react";

import CoinFlipContract from "./contracts/CoinFlip.json";

import getWeb3 from "./components/getWeb3";
import Loader from "./components/Loader";
import Layout from "./components/Layout";

import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState({});
  const [contractBalance, setContractBalance] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [betWon, setBetWon] = useState(false);
  const [gamblersAddress, setGamblersAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [howMuchWasBet, setHowMuchWasBet] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [isActive, setIsActive] = useState("");
  const [userBalanceBeforeBet, setUserBalanceBeforeBet] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusIsDisplayed, setStatusIsDisplayed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const whichWeb3 = await getWeb3();
        const whichAccounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CoinFlipContract.networks[networkId];
        const instance = new web3.eth.Contract(
          CoinFlipContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        let lookupOwner = await instance.methods.getOwner().call();
        const owner = lookupOwner[0];
        const user = accounts[0];
        const balanceInWei = await web3.eth.getBalance(deployedNetwork.address);
        const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

        setWeb3(whichWeb3);
        setAccounts(whichAccounts);
        setContract(instance);
        setContractBalance(balanceInEth);
        setContractAddress(deployedNetwork.address);
        user === owner ? setIsOwner(true) : setIsOwner(false);
        user !== owner ? setIsUser(true) : setIsUser(false);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };
  });

  const removeStatusMessage = () => setStatusIsDisplayed(false);

  const selectFundAmount = (e) => setFundAmount(e.currentTarget.id);

  const refreshFundAmount = () => setFundAmount("0");

  const handleBet = (e) => setBetAmount(e.target.value);

  //
  // const fundContract = async (e) => {
  //   const { web3, accounts, contract, contractAddress } = this.state;
  //   let { fundAmount } = this.state;
  //
  //   if (fundAmount === "0") {
  //     this.setState({
  //       statusMessage: "Sorry, you can't send zero ether to the contract!",
  //       statusIsDisplayed: true,
  //     });
  //     return;
  //   }
  //
  //   const config = {
  //     from: accounts[0],
  //     value: web3.utils.toWei(fundAmount, "ether"),
  //   };
  //
  //   const donation = await contract.methods
  //     .fundContract()
  //     .send(config)
  //     .on("transactionHash", (hash) => {
  //       console.log(hash);
  //     })
  //     .on("confirmation", (confirmationNum) => {
  //       console.log(confirmationNum);
  //     })
  //     .on("receipt", (receipt) => {
  //       console.log(receipt);
  //     });
  //
  //   let balance = await web3.eth.getBalance(contractAddress);
  //   this.setState({
  //     contractBalance: web3.utils.fromWei(balance, "ether"),
  //     statusMessage:
  //       "Your donation has been accepted. Thanks for your support!",
  //     statusIsDisplayed: true,
  //   });
  // };
  //
  //
  // const placeBet = async (e) => {
  //   const { web3, accounts, contract, contractAddress } = this.state;
  //   let { betAmount } = this.state;
  //   if (betAmount.match(/[a-zA-Z]/)) {
  //     this.setState({
  //       statusMessage:
  //         "Sorry, you can only bet with numbers! Check your bet amount.",
  //       statusIsDisplayed: true,
  //     });
  //     return;
  //   } else if (betAmount > 5) {
  //     this.setState({
  //       statusMessage: "Sorry, you can't bet more than 5 ether.",
  //       statusIsDisplayed: true,
  //     });
  //     return;
  //   } else if (betAmount === "0") {
  //     this.setState({
  //       statusMessage: "Sorry, you can't bet 0 ether",
  //       statusIsDisplayed: true,
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
  //       statusMessage: "Sorry, you can't bet more than the contract balance.",
  //       statusIsDisplayed: true,
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
  //     statusMessage: "Bet successfully made.",
  //     statusIsDisplayed: true,
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
  //       statusMessage: "Sorry, there are no funds to withdraw.",
  //       statusIsDisplayed: true,
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
  //     statusMessage: `Your account ${accounts[0]} now has ${web3.utils.fromWei(
  //       withdrawalAmount,
  //       "ether"
  //     )} more ether.`,
  //     statusIsDisplayed: true,
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
  //       statusMessage: "Sorry, there are no funds to withdraw.",
  //       statusIsDisplayed: true,
  //     });
  //     return;
  //   }
  //   let balanceBefore = contractBalance;
  //   await contract.methods.withdrawAll().send({ from: accounts[0] });
  //   let balanceAfter = await web3.eth.getBalance(contractAddress);
  //   this.setState({
  //     contractBalance: web3.utils.fromWei(balanceAfter, "ether"),
  //     statusMessage: `Your account ${accounts[0]} now has ${balanceBefore} more ether.`,
  //     statusIsDisplayed: true,
  //   });
  // };
  //
  // if (!web3) {
  //   return (
  //     <>
  //       <Loader />
  //     </>
  //   );
  // }

  return (
    <div className="App">
      <div className="rainbow-top"></div>

      <Layout
        statusMessage={statusMessage}
        removeStatusMessage={removeStatusMessage}
        statusIsDisplayed={statusIsDisplayed}
        contractBalance={contractBalance}
        isOwner={isOwner}
        isUser={isUser}
        // fundAmount={fundAmount}
        // selectFundAmount={selectFundAmount}
        // refreshFundAmount={refreshFundAmount}
        // fundContract={fundContract}
        // isActive={isActive}
        // withdrawOneEther={withdrawOneEther}
        // withdrawAllEther={withdrawAllEther}
        // handleBet={handleBet}
        // betAmount={betAmount}
        // placeBet={placeBet}
        // betWon={betWon}
        // gamblersAddress={gamblersAddress}
        // howMuchWasBet={howMuchWasBet}
        // userBalanceBeforeBet={userBalanceBeforeBet}
        // newBalance={userBalance}
      />
    </div>
  );
};

export default App;
