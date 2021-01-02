import React from 'react';
import {
  AccountModal,
  // Footer,
  Modal,
  NavMenu,
  WalletModal,
  Web3ReactManager,
} from './components';

const App = () => (
  <div className="App">
    <NavMenu />
    <WalletModal />
    <AccountModal />
    <Modal />
    <Web3ReactManager>
      <small>connected</small>
    </Web3ReactManager>
  </div>
);

export default App;
