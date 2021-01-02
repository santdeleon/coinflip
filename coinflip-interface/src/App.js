import React from 'react';
import {
  Web3ReactManager,
  NavMenu,
  // Footer,
  WalletModal,
  AccountModal,
} from './components';

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
