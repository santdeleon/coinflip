import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import './App.css';

import Web3ReactManager from './components/Web3ReactManager';
import Header from './components/Header';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import WalletConnectModal from './components/WalletConnectModal';

const App = () => {
  return (
    <div className="App">
      <Container fluid>
        <Header />
        <NavMenu />
        <WalletConnectModal />
        <Footer />

        {/* Here temporarily, should eventually wrap main app content */}
        <Web3ReactManager>
          <small>
            <FontAwesomeIcon icon={faCircle} className="text-success mr-1" />{' '}
            <b>connected</b>
          </small>
        </Web3ReactManager>
      </Container>
    </div>
  );
};

export default App;
