import React from 'react';

import './App.css';

import Web3ReactManager from './components/Web3ReactManager';
import NavMenu from './components/Navbar';
// import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import AccountModal from './components/AccountModal';

const App = () => (
  <div className="App">
    <NavMenu />
    <WalletModal />
    <AccountModal />

    <Web3ReactManager>
      <small>connected</small>
    </Web3ReactManager>
  </div>
);

export default App;
