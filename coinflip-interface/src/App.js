import React from 'react';
import { Container } from 'react-bootstrap';

import './App.css';

import Web3ReactManager from './components/Web3ReactManager';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import WalletConnectModal from './components/WalletConnectModal';

const App = () => (
  <div className="App">
    <Web3ReactManager>
      <Container fluid>
        <NavMenu />
        <Footer />
        <WalletConnectModal />
      </Container>
    </Web3ReactManager>
  </div>
);

export default App;
