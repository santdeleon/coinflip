import React, { Component } from "react";
import CoinFlip from "../../contracts/CoinFlip.json";
import getWeb3 from "../../getWeb3";

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
    gamblersAddress: null,
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
      let lookupOwner = await instance.methods.getOwner().call();
      const owner = lookupOwner[0];
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
        gamblersAddress: "",
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

  removeStatusMessage = (e) => { this.setState({ statusIsDisplayed: false });};

  selectFundAmount = (e) => {
    let donation = e.target.id;
    if (donation === "") donation = "0";
    this.setState({ fundAmount: donation });
  };

  refreshFundAmount = (e) => { this.setState({fundAmount: "0"}); };

  fundContract = async (e) => {
    const { web3, accounts, contract, contractAddress } = this.state;
    let { fundAmount } = this.state;

    if (fundAmount === "0") {
      this.setState({
        statusMessage: "Sorry, you can't send zero ether to the contract!",
        statusIsDisplayed: true
      });
      return;
    };

    const config = {
      from: accounts[0],
      value: web3.utils.toWei(fundAmount, "ether")
    };

    const donation = await contract.methods.fundContract().send(config)
    .on("transactionHash", (hash) => {
      console.log(hash);
    })
    .on("confirmation", (confirmationNum) => {
      console.log(confirmationNum);
    })
    .on("receipt", (receipt) => {
      console.log(receipt);
    });

    let balance = await web3.eth.getBalance(contractAddress);
    this.setState({
      contractBalance: web3.utils.fromWei(balance, "ether"),
      statusMessage: "Your donation has been accepted. Thanks for your support!",
      statusIsDisplayed: true
    });
  };

  handleBet = (e) => {this.setState({ betAmount: e.target.value});};

  placeBet = async (e) => {
    const { web3, accounts, contract, contractAddress } = this.state;
    let { betAmount } = this.state;
    console.log(betAmount);
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
      this.setState({
        statusMessage: "Sorry, you can't bet more than the contract balance.",
        statusIsDisplayed: true
      });
      return;
    }

    let config = {
      from: accounts[0],
      value: betAmount
    };

    let oldUserBalance = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
    let bet = await contract.methods.bet(accounts[0], betAmount).send(config);
    let results = bet.events.BetPlaced.returnValues;
    let newUserBalance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), "ether");
    let newContractBalance = web3.utils.fromWei(await web3.eth.getBalance(contractAddress), "ether");

    this.setState({
      betAmount: web3.utils.fromWei(betAmount, "ether"),
      betWon: results.betWon,
      gamblersAddress: results.gambler,
      userBalanceBeforeBet: oldUserBalance,
      userBalance: newUserBalance,
      statusMessage: "Bet successfully made.",
      statusIsDisplayed: true,
      howMuchWasBet: web3.utils.fromWei(results.amount, "ether"),
      contractBalance: newContractBalance,
    });
  };

  withdrawOneEther = async (e) => {
    const { web3, contract, accounts, contractAddress, contractBalance } = this.state;
    let withdrawalAmount = web3.utils.toWei("1", "ether");

    if (contractBalance <= 0) {
      this.setState({
        statusMessage: "Sorry, there are no funds to withdraw.",
        statusIsDisplayed: true
      });
      return;
    }

    if (contractBalance < withdrawalAmount && contractBalance > 0) {
      withdrawalAmount = web3.utils.toWei(contractBalance, "ether");
    }

    await contract.methods.withdraw(withdrawalAmount).send({from: accounts[0]});
    let balance = await web3.eth.getBalance(contractAddress);
    this.setState({
      contractBalance: web3.utils.fromWei(balance, "ether"),
      statusMessage: `Your account ${accounts[0]} now has ${web3.utils.fromWei(withdrawalAmount, "ether")} more ether.`,
      statusIsDisplayed: true
    });
  };

  withdrawAllEther = async (e) => {
    const { web3, contract, accounts, contractAddress, contractBalance } = this.state;
    if (contractBalance <= 0) {
      this.setState({
        statusMessage: "Sorry, there are no funds to withdraw.",
        statusIsDisplayed: true
      });
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
          withdrawOneEther={this.withdrawOneEther}
          withdrawAllEther={this.withdrawAllEther}
          handleBet={this.handleBet}
          betAmount={this.state.betAmount}
          placeBet={this.placeBet}
          betWon={this.state.betWon}
          gamblersAddress={this.state.gamblersAddress}
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
