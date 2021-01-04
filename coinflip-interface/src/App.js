import React from 'react';
import {
  Header,
  AccountModal,
  WalletModal,
  Web3ReactManager,
} from './components';

const App = () => (
  <div className="App">
    <Header />
    <WalletModal />
    <AccountModal />
    <Web3ReactManager>connected</Web3ReactManager>
  </div>
);

export default App;
