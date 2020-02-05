import React, { Component } from "react";
import CoinFlip from "../../contracts/CoinFlip.json";
import getWeb3 from "../../components/getWeb3/getWeb3";

import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import Message from "../../components/Message/Message";
import Body from "../../components/Body/Body";
import Footer from "../../components/Footer/Footer";


import "./App.css";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    contractBalance: null,
    contractAddress: null,
    isOwner: false,
    isUser: false,
    userBalanceBeforeBet: "",
    userBalance: null,
    fundAmount: "",
    isActive: false,
    statusMessage: "",
    statusIsDisplayed: false,
    betAmount: "",
    betWon: "",
    playersAddress: null,
    howMuchWasBet: ""
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CoinFlip.networks[networkId];
      const instance = new web3.eth.Contract(
        CoinFlip.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const owner = await instance.methods.owner().call();
      const user = accounts[0];
      const balanceInWei = await web3.eth.getBalance(deployedNetwork.address);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");

      this.setState({
        web3,
        accounts,
        contract: instance,
        contractBalance: balanceInEth,
        contractAddress: deployedNetwork.address,
        isOwner: (user === owner) ? true : false,
        isUser: (user !== owner) ? true : false,
        betWon: "",
        playersAddress: "",
        userBalance: "",
        howMuchWasBet: ""
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  removeStatusMessage = () => { this.setState({ statusIsDisplayed: false }); };

  selectFundAmount = (e) => { this.setState({ fundAmount: e.currentTarget.id }); };

  refreshFundAmount = () => { this.setState({ fundAmount: "0" }); };

  fundContract = async () => {
    const { web3, accounts, contract, contractAddress, isOwner } = this.state;
    let { fundAmount } = this.state;

    if (!isOwner) {
      this.setState({ statusMessage: "Sorry, only the owner of the contract can fund this game. Thanks for trying though!", statusIsDisplayed: true });
      return;
    };

    if (fundAmount === "0") {
      this.setState({ statusMessage: "Sorry, you can't send zero ether to the contract!", statusIsDisplayed: true });
      return;
    };

    const config = { from: accounts[0], value: web3.utils.toWei(fundAmount, "ether")};
    await contract.methods.fundContract().send(config);

    let balance = await web3.eth.getBalance(contractAddress);
    this.setState({
      contractBalance: web3.utils.fromWei(balance, "ether"),
      statusMessage: "Your donation has been accepted. Thanks for your support!",
      statusIsDisplayed: true
    });
  };

  handleBet = (e) => { this.setState({ betAmount: e.target.value}); };

  placeBet = async (e) => {
    const { web3, accounts, contract, contractAddress } = this.state;
    let { betAmount } = this.state;

    if (betAmount.match(/[a-zA-Z]/)) {
      this.setState({
        statusMessage: "Sorry, you can only bet with numbers! Check your bet amount.",
        statusIsDisplayed: true
      });
      return;
    } else if (betAmount > 5) {
      this.setState({
        statusMessage: "Sorry, you can't bet more than 5 ether.",
        statusIsDisplayed: true
      });
      return;
    } else if (betAmount === "0") {
      this.setState({
        statusMessage: "Sorry, you can't bet 0 ether",
        statusIsDisplayed: true
      });
      return;
    }

    betAmount = web3.utils.toWei(betAmount, "ether");

    if (parseInt(betAmount) > parseInt(await web3.eth.getBalance(contractAddress))) {
      this.setState({ statusMessage: "Sorry, you can't bet more than the contract balance.", statusIsDisplayed: true });
      return;
    }

    let queryId;
    let currentBet;
    let newUserBalance;
    let newContractBalance;
    let betCount = await contract.methods.getBetCount().call();
    let config = { from: accounts[0], value: betAmount };
    let oldUserBalance = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether");

    let bet = await contract.methods.bet(betAmount).send(config)
    .on("transactionHash", (hash) => {
      console.log(`Hash: ${hash}`);
    })
    .on("confirmation", async (confirmationNum) => {
      console.log(confirmationNum);


      if (confirmationNum === 5) {
        for (let i = 0; i <= betCount; i++) {
          currentBet = await contract.methods.bets(i).call();

          if (currentBet.queryId === queryId && currentBet.isPending === false) {
            newUserBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
            newContractBalance = web3.utils.fromWei(await web3.eth.getBalance(contractAddress), "ether");

            this.setState({
              betAmount: web3.utils.fromWei(betAmount, "ether"),
              betWon: currentBet.betWon,
              playersAddress: currentBet.player,
              userBalanceBeforeBet: oldUserBalance,
              userBalance: newUserBalance,
              statusMessage: "Bet successfully made.",
              statusIsDisplayed: true,
              howMuchWasBet: web3.utils.fromWei(currentBet.amount, "ether"),
              contractBalance: newContractBalance,
            });
          }
        }
      }
    })
    .on("receipt", (receipt) => {
      console.log(receipt);
    });

    queryId = bet.events.BetPlaced.returnValues.queryId;
    newContractBalance = web3.utils.fromWei(await web3.eth.getBalance(contractAddress), "ether");
    this.setState({ contractBalance: newContractBalance });
  };

  withdrawAllEther = async (e) => {
    const { web3, contract, accounts, contractAddress, contractBalance } = this.state;
    if (contractBalance <= 0) {
      this.setState({ statusMessage: "Sorry, there are no funds to withdraw.", statusIsDisplayed: true });
      return;
    };

    let balanceBefore = contractBalance;
    await contract.methods.withdrawAll().send({from: accounts[0]});
    let balanceAfter = await web3.eth.getBalance(contractAddress);
    this.setState({
      contractBalance: web3.utils.fromWei(balanceAfter, "ether"),
      statusMessage: `Your account ${accounts[0]} now has ${balanceBefore} more ether.`,
      statusIsDisplayed: true
    });
  };

  render() {
    if (!this.state.web3) {
      return (
        <>
          <Loader />
        </>
      );
    }

    return (
      <div className="App">
        <div className="rainbow-top"></div>
        <Message statusMessage={this.state.statusMessage} removeStatusMessage={this.removeStatusMessage} statusIsDisplayed={this.state.statusIsDisplayed}/>
        <Navbar contractBalance={this.state.contractBalance}/>
        <Body
          isOwner={this.state.isOwner}
          isUser={this.state.isUser}
          fundAmount={this.state.fundAmount}
          selectFundAmount={this.selectFundAmount}
          refreshFundAmount={this.refreshFundAmount}
          fundContract={this.fundContract}
          isActive={this.state.isActive}
          withdrawAllEther={this.withdrawAllEther}
          handleBet={this.handleBet}
          betAmount={this.state.betAmount}
          placeBet={this.placeBet}
          betWon={this.state.betWon}
          playersAddress={this.state.playersAddress}
          howMuchWasBet={this.state.howMuchWasBet}
          userBalanceBeforeBet={this.state.userBalanceBeforeBet}
          newBalance={this.state.userBalance}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
