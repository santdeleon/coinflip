import React, { Component } from "react";
import CoinFlip from "../../contracts/CoinFlip.json";
import getWeb3 from "../../getWeb3";

import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import SuccessBar from "../../components/SuccessBar/SuccessBar";
import Body from "../../components/Body/Body";
import Footer from "../../components/Footer/Footer";


import "./App.css";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    contractBalance: null,
    betWon: false,
    fundAmount: "",
    isClicked: false,
    network: null
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

      console.log(CoinFlip);
      const balanceInWei = await web3.eth.getBalance(accounts[0]);
      console.log(balanceInWei);

      this.setState({
        web3,
        accounts,
        contract: instance,
        contractBalance: instance
      });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
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
        <SuccessBar />
        <Navbar contractBalance={this.state.contractBalance}/>
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
