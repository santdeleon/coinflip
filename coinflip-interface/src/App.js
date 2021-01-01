import React from 'react';
import { Container } from 'react-bootstrap';

import './App.css';

import Web3ReactManager from './components/Web3ReactManager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import AccountModal from './components/AccountModal';

const App = () => (
  <div className="App">
    {/* <Container fluid>
      <Navbar />
      <WalletModal />
      <AccountModal />
      <Footer />

      <Web3ReactManager>
        <small>connected</small>
      </Web3ReactManager>
    </Container> */}
    <Navbar />
    <Web3ReactManager>
      <small>connected</small>
    </Web3ReactManager>
  </div>
);

export default App;
